const express = require("express");
const Chat = require("../models/ChatSchema");
const Project = require("../models/ProjectSchema");
const { v4: uuidv4 } = require("uuid");
const generateCodeFromAI = require("../services/geminiService");
const mongoose = require("mongoose");
const User = require('../models/User')

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