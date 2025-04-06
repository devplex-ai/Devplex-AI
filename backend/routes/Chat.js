const express = require("express");
const Chat = require("../models/ChatSchema");
const Project = require("../models/ProjectSchema");
const { v4: uuidv4 } = require("uuid");
const generateCodeFromAI = require("../services/geminiService");
const mongoose = require("mongoose");
const User = require('../models/User');
const enhanceGeneratedCode = require("../services/CodeEnhancer");

const router = express.Router();

router.post("/start-chat", async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return res.status(400).json({
        error: "Invalid prompt",
        details: "Prompt must be a non-empty string",
        code: "INVALID_PROMPT",
      });
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        error: "Invalid user ID",
        details: "Must provide a valid MongoDB ObjectId",
        code: "INVALID_USER_ID",
      });
    }

    const sessionId = uuidv4();
    let aiResponse,
      aiError = null;

    try {
      aiResponse = await generateCodeFromAI(prompt);

      if (!aiResponse || !aiResponse.files || !aiResponse.projectTitle) {
        aiError = new Error("Incomplete AI response");
        aiError.code = "AI_INCOMPLETE_RESPONSE";
        throw aiError;
      }
    } catch (error) {
      console.error("AI Service Error:", {
        message: error.message,
        stack: error.stack,
        code: error.code || "UNKNOWN_AI_ERROR",
      });
      aiError = error;
    }

    const messages = [
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: aiError ? `Error: ${aiError.message}` : aiResponse.response,
        updates: aiError ? "No updates generated" : aiResponse.updates,
      },
    ];

    const chatData = {
      userId: new mongoose.Types.ObjectId(userId),
      sessionId,
      messages,
      metadata: {
        aiError: aiError
          ? {
              message: aiError.message,
              code: aiError.code,
              timestamp: new Date(),
            }
          : null,
        aiSuccess: !aiError,
      },
    };

    const [savedChat, savedProject] = await Promise.all([
      Chat.create(chatData),
      !aiError
        ? Project.create({
            sessionId,
            userId: new mongoose.Types.ObjectId(userId),
            response: aiResponse.response,
            updates: aiResponse.updates,
            projectTitle: aiResponse.projectTitle,
            explanation: aiResponse.explanation || "No explanation provided",
            files: Object.entries(aiResponse.files || {}).map(
              ([filename, file]) => ({
                filename,
                code: file.code || "",
              })
            ),
          })
        : null,
    ]);

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          chats: savedChat._id,
          ...(savedProject && { projects: savedProject._id }),
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      sessionId: savedChat.sessionId,
      messages: savedChat.messages.map(({ role, content, timestamp }) => ({
        role,
        content,
        timestamp,
      })),
      createdAt: savedChat.createdAt,
      status: aiError ? "partial_success" : "complete_success",
      error: aiError
        ? { message: aiError.message, code: aiError.code, retrySuggested: true }
        : null,
      project: savedProject
        ? {
            id: savedProject._id,
            title: savedProject.projectTitle,
            files: savedProject.files.map((file) => file.filename),
          }
        : null,
    });
  } catch (error) {
    console.error("Chat Endpoint Error:", {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    return res.status(error.name === "ValidationError" ? 400 : 500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
});

// router.post("/enhance-chat", async (req, res) => {
//   try {
//     const { sessionId, prompt } = req.body;

//     if (!sessionId || !prompt) {
//       return res.status(400).json({
//         error: "Missing sessionId or prompt",
//         code: "INVALID_INPUT",
//       });
//     }

//     const project = await Project.findOne({ sessionId });

//     if (!project) {
//       return res.status(404).json({
//         error: "Project not found",
//         code: "PROJECT_NOT_FOUND",
//       });
//     }

//     const chat = await Chat.findOne({ sessionId });

//     if (!chat) {
//       return res.status(404).json({
//         error: "Chat session not found",
//         code: "CHAT_NOT_FOUND",
//       });
//     }

//     // Prepare current project code to send to AI
//  const currentFiles = {};
//  project.files.forEach((file) => {
//    currentFiles[file.filename] = { code: file.code };
//  });
//     // Send current code + new prompt to AI
//     const aiResponse = await enhanceGeneratedCode(prompt, currentFiles);

//     // Add new AI message to chat
//     const newMessage = {
//       role: "user",
//       content: prompt,
//     };

//     const aiMessage = {
//       role: "assistant",
//       content: aiResponse?.response || "No response generated",
//       updates: aiResponse?.updates || "No updates available",
//     };


//     if (!aiMessage.content.trim()) {
//       console.error("AI response is empty. Not saving to chat.");
//       return res
//         .status(500)
//         .json({ error: "AI did not return a valid response" });
//     }

//     chat.messages.push({ role: "user", content: prompt });
//     chat.messages.push(aiMessage);
//     await chat.save();

//     // Update the project with new files and append history
//     const updatedFiles = Object.entries(aiResponse.files || {}).map(
//       ([filename, file]) => ({
//         filename,
//         code: file.code || "",
//       })
//     );

//     project.files = updatedFiles;
//     project.response = aiResponse.response;
//     project.updates = aiResponse.updates;
//     project.explanation = aiResponse.explanation || "No explanation provided";
//     await project.save();

//     return res.status(200).json({
//       success: true,
//       updatedFiles: project.files,
//       chat: chat.messages.map(({ role, content, timestamp }) => ({
//         role,
//         content,
//         timestamp,
//       })),
//       project: {
//         id: project._id,
//         title: project.projectTitle,
//         explanation: project.explanation,
//       },
//     });
//   } catch (error) {
//     console.error("Enhance Chat Error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Failed to enhance project",
//       details: error.message,
//     });
//   }
// });


// router.post("/start-chat", async (req, res) => {
//   try {
//     const { userId, prompt } = req.body;

//     // 1. Strict Input Validation
//     if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
//       return res.status(400).json({
//         error: "Invalid prompt",
//         details: "Prompt must be a non-empty string",
//         code: "INVALID_PROMPT",
//       });
//     }

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         error: "Invalid user ID",
//         details: "Must provide a valid MongoDB ObjectId",
//         code: "INVALID_USER_ID",
//       });
//     }

//     // 2. Generate session ID
//     const sessionId = uuidv4();

//     // 3. Get AI response with comprehensive error handling
//     let aiResponse;
//     let aiError = null;

//     try {
//       aiResponse = await generateCodeFromAI(prompt);

//       if (!aiResponse || !aiResponse.projectTitle) {
//         aiError = new Error("Invalid response format from AI service");
//         aiError.code = "AI_INVALID_RESPONSE";
//         throw aiError;
//       }
//     } catch (error) {
//       console.error("AI Service Error:", {
//         error: error.message,
//         stack: error.stack,
//         code: error.code || "UNKNOWN_AI_ERROR",
//       });
//       aiError = error;
//     }

//     // 4. Create chat document
//     const messages = [
//       {
//         role: "user",
//         content: prompt,
//       },
//       {
//         role: "assistant",
//         content: aiError
//           ? `Failed to generate response: ${aiError.message}`
//           : aiResponse.response || "Project generated successfully",
//         updates: aiError
//           ? `Failed to generate updates: ${aiError.message}`
//           : aiResponse.updates || "Updates generated successfully",
//       },
//     ];

//     const chatData = {
//       userId: new mongoose.Types.ObjectId(userId),
//       sessionId,
//       messages,
//       metadata: {
//         aiError: aiError
//           ? {
//               message: aiError.message,
//               code: aiError.code || "UNKNOWN_AI_ERROR",
//               timestamp: new Date(),
//             }
//           : null,
//         aiSuccess: !aiError,
//       },
//     };


//     const [savedChat, savedProject] = await Promise.all([
//       Chat.create(chatData),

      

//       !aiError
//         ? Project.create({
//             sessionId,
//             userId: new mongoose.Types.ObjectId(userId),
//             response: aiResponse.response,
//             updates: aiResponse.updates,
//             projectTitle: aiResponse.projectTitle,
//             explanation: aiResponse.explanation || "No explanation provided",
//             files: Object.entries(aiResponse.files || {}).map(
//               ([filename, file]) => ({
//                 filename,
//                 code: file.code || "",
//               })
//             ),
//           })
//         : null,
//     ]);

//    if (savedProject) {
//      await User.findByIdAndUpdate(
//        userId,
//        {
//          $push: {
//            projects: savedProject._id,
//            chats: savedChat._id, // Move inside the same object
//          },
//        },
//        { new: true }
//      );
//    }

//     // 6. Prepare response
//     const response = {
//       success: true,
//       sessionId: savedChat.sessionId,
//       messages: savedChat.messages.map((msg) => ({
//         role: msg.role,
//         content: msg.content,
//         timestamp: msg.timestamp,
//       })),
//       createdAt: savedChat.createdAt,
//       status: aiError ? "partial_success" : "complete_success",
//       ...(aiError && {
//         error: {
//           message: "AI service encountered an error",
//           code: aiError.code || "AI_SERVICE_ERROR",
//           retrySuggested: true,
//         },
//       }),
//       ...(savedProject && {
//         project: {
//           id: savedProject._id,
//           title: savedProject.projectTitle,
//           files: savedProject.files.map((file) => file.filename),
//         },
//       }),
//     };

//     return res.status(201).json(response);
//   } catch (error) {
//     console.error("Chat Endpoint Error:", {
//       name: error.name,
//       message: error.message,
//       stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//     });

//     const statusCode = error.name === "ValidationError" ? 400 : 500;
//     return res.status(statusCode).json({
//       success: false,
//       error: "Internal server error",
//       details: error.message,
//       ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
//     });
//   }
// });
// router.post("/start-chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Strict Input Validation
//     if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
//       return res.status(400).json({
//         error: "Invalid prompt",
//         details: "Prompt must be a non-empty string",
//         code: "INVALID_PROMPT",
//       });
//     }

//     // Get AI response with error handling
//     let aiResponse;
//     let aiError = null;

//     try {
//       aiResponse = await generateCodeFromAI(prompt);

//       if (!aiResponse || !aiResponse.projectTitle) {
//         aiError = new Error("Invalid response format from AI service");
//         aiError.code = "AI_INVALID_RESPONSE";
//         throw aiError;
//       }
//     } catch (error) {
//       console.error("AI Service Error:", {
//         error: error.message,
//         stack: error.stack,
//         code: error.code || "UNKNOWN_AI_ERROR",
//       });
//       aiError = error;
//     }

//     // Console log AI response
//     if (aiError) {
//       console.log("AI Error:", aiError.message);
//     } else {
//       console.log("AI Response:", aiResponse);
//     }

//     // Prepare response
//     const response = {
//       success: !aiError,
//       status: aiError ? "error" : "success",
//       ...(aiError
//         ? {
//             error: {
//               message: aiError.message,
//               code: aiError.code || "AI_ERROR",
//             },
//           }
//         : { response: aiResponse }),
//     };

//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Chat Endpoint Error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//       details: error.message,
//     });
//   }
// });
router.post("/enhance-chat", async (req, res) => {
  try {
    const { sessionId, prompt } = req.body;

    // Validate input
    if (!sessionId || !prompt?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Missing or invalid parameters",
        details: !sessionId
          ? "sessionId is required"
          : "prompt cannot be empty",
        code: "INVALID_INPUT",
      });
    }

    // Fetch project and chat in parallel for better performance
    const [project, chat] = await Promise.all([
      Project.findOne({ sessionId }).lean(),
      Chat.findOne({ sessionId }).lean(),
    ]);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
        code: "PROJECT_NOT_FOUND",
        retrySuggested: false,
      });
    }

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat session not found",
        code: "CHAT_NOT_FOUND",
        retrySuggested: false,
      });
    }

    // Prepare files for enhancement
    const currentFiles = project.files.reduce((acc, file) => {
      acc[file.filename] = { code: file.code };
      return acc;
    }, {});

    // Process AI enhancement
    let aiResponse,
      aiError = null;
    try {
      aiResponse = await enhanceGeneratedCode(prompt, currentFiles);

      if (!aiResponse?.enhancedFiles) {
        throw new Error("AI response did not contain enhanced files");
      }
    } catch (error) {
      console.error("AI Enhancement Error:", {
        sessionId,
        error: error.message,
        code: error.code || "AI_ENHANCEMENT_FAILED",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
      aiError = error;
    }

    // Normalize AI response
    const normalizedResponse = {
      files: aiResponse?.enhancedFiles || currentFiles, // Fallback to original files if enhancement failed
      response: aiError
        ? `Enhancement failed: ${aiError.message}`
        : aiResponse?.response || "Code enhancement applied successfully",
      updates: aiResponse?.updates || [],
      explanation:
        aiResponse?.explanation || "No detailed explanation provided",
      timestamp: new Date().toISOString(),
    };

    // Prepare updates for chat and project
    const chatUpdate = {
      $push: {
        messages: {
          $each: [
            { role: "user", content: prompt, timestamp: new Date() },
            {
              role: "assistant",
              content: normalizedResponse.response,
              updates: normalizedResponse.updates,
              timestamp: new Date(),
            },
          ],
        },
      },
    };

    const projectUpdate = {
      $set: {
        files: Object.entries(normalizedResponse.files).map(
          ([filename, file]) => ({
            filename,
            code: file.code || "",
          })
        ),
        lastUpdated: new Date(),
        response: normalizedResponse.response,
        explanation: normalizedResponse.explanation,
        updates: Array.isArray(normalizedResponse.updates)
          ? normalizedResponse.updates
          : [{ message: "No specific updates recorded" }],
      },
    };

    // Update database
    await Promise.all([
      Chat.updateOne({ _id: chat._id }, chatUpdate),
      Project.updateOne({ _id: project._id }, projectUpdate),
    ]);

    // Fetch updated documents
    const [updatedProject, updatedChat] = await Promise.all([
      Project.findById(project._id).lean(),
      Chat.findById(chat._id).lean(),
    ]);

    return res.status(200).json({
      success: !aiError,
      status: aiError ? "partial_success" : "complete_success",
      enhancedFiles: updatedProject.files,
      chat: {
        messages: updatedChat.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          ...(msg.updates && { updates: msg.updates }),
          timestamp: msg.timestamp,
        })),
        sessionId: updatedChat.sessionId,
      },
      project: {
        id: updatedProject._id,
        title: updatedProject.projectTitle,
        explanation: updatedProject.explanation,
        updates: updatedProject.updates,
      },
      ...(aiError && {
        error: {
          message: aiError.message,
          code: aiError.code || "AI_ENHANCEMENT_ERROR",
          retrySuggested: true,
        },
      }),
    });
  } catch (error) {
    console.error("Enhance Chat Endpoint Error:", {
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "production"
          ? "Please try again later"
          : error.message,
      code: "SERVER_ERROR",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
});


router.get("/chats/:sessionId", async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    console.log(`Fetching chat for sessionId: ${sessionId}`); // Debugging log

    const chat = await Chat.findOne({ sessionId });
    if (!chat) {
      
      return res.status(404).json({ error: "Chat not found" });
    }

  
    res.json({ messages: chat.messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/chatHistory/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Fetch userId from request parameters


    const chats = await Chat.find({ userId }); // Fetch all chats matching the userId

    if (!chats.length) {
      return res.status(404).json({ error: "No chats found for this user" });
    }

    res.json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get("/chatHistory/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log(`Fetching chat history with chatId: ${id}`);

//     const chat = await Chat.findOne({ _id: id });

//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     console.log("Fetched Chat Data:", chat); // ✅ Debugging

//     res.json({ messages: chat.messages, sessionId: chat.sessionId });
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/chatHistory/:id", async (req, res) => {
//   try {
//     const id = req.params.id;

//     // Validate ID format first to avoid unnecessary DB queries
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ error: "Invalid chat ID format" });
//     }

//     console.log(`Fetching chat history with chatId: ${id}`);

//     // Use lean() for better performance when you only need JSON data
//     // Select only the fields you need
//     const chat = await Chat.findById(id).select("messages sessionId").lean();

//     if (!chat) {
//       console.log(`Chat with ID ${id} not found`);
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     console.log(`Successfully retrieved chat with ID: ${id}`);

//     res.json({
//       messages: chat.messages,
//       sessionId: chat.sessionId,
//     });
//   } catch (error) {
//     console.error("Error fetching chat history:", error);

//     // More specific error handling
//     if (error.name === "CastError") {
//       return res.status(400).json({ error: "Invalid chat ID format" });
//     }

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


router.get("/projects/:sessionId", async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
 

    const project = await Project.findOne({ sessionId });

    if (!project) {

      return res.status(404).json({ error: "Project not found" });
    }

   
    res.json({ files: project.files });
  } catch (error) {
    console.error("Error fetching project files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;