// const axios = require("axios");
// const dedent = require("dedent");

// const generateCodeFromAI = async (userPrompt) => {
//   const API_KEY = process.env.DEEPSEEK_API;

//   if (!API_KEY) {
//     console.error("Error: Missing DEEPSEEK_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       details: "Please check your environment configuration",
//     };
//   }

//   const API_URL = "https://api.deepseek.com/v1/chat/completions";

//   const responses = [
//     "Alright! Here's how we'll create your",
//     "Great! Let's build your",
//     "Okay! Here's the plan for your",
//     "Let's enhance this feature! We'll create your",
//     "No problem! Here's how we'll approach your",
//     "Let's get started! We'll create your",
//   ];
//   const randomResponse =
//     responses[Math.floor(Math.random() * responses.length)];

//   const CODE_GEN_PROMPT = {
//     model: "deepseek-chat",
//     messages: [
//       {
//         role: "system",
//         content: dedent`
//           # Two-Phase Response System

//           ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
//           Respond conversationally to the user's request first, then proceed with the structured output.
          
//           Example Response Format:
//           "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach].
//           I'll generate a complete React project with [Key Features]."

//           ## Phase 2: Structured Output (After conversational intro)
//           Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension.
//           Use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library when necessary.

//           USER REQUIREMENTS:
//           ${userPrompt || "No additional requirements provided"}
          
//           RESPONSE REQUIREMENTS:
//           - Return valid JSON only, beginning with { and ending with }
//           - Follow this exact structure:
//          OUTPUT FORMAT REQUIREMENTS (strict JSON):
// {
//   "response": "Conversational Introduction",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.js"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Descriptive project title",
//   "explanation": "Detailed description of the project",
  
//   "files": {
//     "/components/ComponentName.jsx": {
//       "code": "// Complete JavaScript component code with all imports",
//       "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
//     },
//     "/App.js": {
//       "code": "// Complete main application code with all imports"
//     }
//   },
//   "setupInstructions": "npm install && npm run dev"
// }


//           IMPORTANT RULES:
//           1. Make beautiful, production-ready designs
//           2. Use lucide-react icons when appropriate
//           3. Apply UI/UX best practices
//           4. Write complete logic (no placeholder comments)
//           5. Use modern React patterns (hooks, etc.)
//           6. For multi-page sites, create at least 5 components
//           7. Focus on functionality for single-page apps
//         `,
//       },
//       {
//         role: "user",
//         content: userPrompt || "Create a React project with Tailwind CSS",
//       },
//     ],
//     temperature: 0.7,
//     max_tokens: 4000,
//     response_format: { type: "json_object" },
//   };

//   try {
//     const response = await axios.post(API_URL, CODE_GEN_PROMPT, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     });

//     const responseText = response.data?.choices?.[0]?.message?.content;

//     if (!responseText) {
//       console.error("No response text found in API response");
//       return {
//         error: "No response text found",
//         details: "The API response did not contain the expected text",
//         fullResponse: response.data,
//       };
//     }

//     let jsonResponse;
//     try {
//       // Clean and parse the JSON response
//       const cleanedResponse = responseText
//         .replace(/^```(json)?\n/, "")
//         .replace(/```$/, "")
//         .trim();

//       jsonResponse = JSON.parse(cleanedResponse);
//     } catch (parseError) {
//       console.error("JSON Parsing Error:", parseError);

//       // Try to extract JSON from malformed response
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         try {
//           jsonResponse = JSON.parse(jsonMatch[0]);
//         } catch (secondAttemptError) {
//           console.error("Secondary parsing failed:", secondAttemptError);
//           return {
//             error: "Invalid JSON response from AI",
//             details: secondAttemptError.message,
//             rawResponse: responseText,
//           };
//         }
//       } else {
//         return {
//           error: "No valid JSON found in response",
//           details: parseError.message,
//           rawResponse: responseText,
//         };
//       }
//     }

//     // Validate the response structure
//     if (!jsonResponse.files || typeof jsonResponse.files !== "object") {
//       return {
//         error: "Invalid project structure",
//         details: "Response missing required 'files' object",
//         response: jsonResponse,
//       };
//     }

//     // Process file contents to ensure proper formatting
//     const processedFiles = {};
//     for (const [path, file] of Object.entries(jsonResponse.files)) {
//       processedFiles[path] = {
//         code: file.code
//           ? file.code.replace(/\\n/g, "\n").replace(/\\"/g, '"')
//           : "",
//         styles: file.styles || "",
//       };
//     }

//     return {
//       ...jsonResponse,
//       files: processedFiles,
//     };
//   } catch (error) {
//     console.error("AI Service Error:", {
//       message: error.message,
//       stack: error.stack,
//       response: error.response?.data,
//     });

//     return {
//       error: "Failed to process AI response",
//       details: error.message,
//       code: "AI_SERVICE_ERROR",
//     };
//   }
// };

// module.exports = generateCodeFromAI;
// const axios = require("axios");
// const dedent = require("dedent");

// const generateCodeFromAI = async (userPrompt) => {
//   const API_KEY = process.env.DEEPSEEK_API;

//   if (!API_KEY) {
//     console.error("Error: Missing DEEPSEEK_API key in environment variables.");
//     return {
//       error: "API key is missing",
//       details: "Please check your environment configuration",
//     };
//   }

//   const API_URL = "https://api.deepseek.com/v1/chat/completions";

//   const responses = [
//     "Alright! Here's how we'll create your",
//     "Great! Let's build your",
//     "Okay! Here's the plan for your",
//     "Let's enhance this feature! We'll create your",
//     "No problem! Here's how we'll approach your",
//     "Let's get started! We'll create your",
//   ];
//   const randomResponse =
//     responses[Math.floor(Math.random() * responses.length)];

//   // Fallback response in case of API failure
//   const getFallbackResponse = () => ({
//     response: `${randomResponse} React project. This is a fallback response.`,
//     updates: [{ operation: "creating", file: "App.js" }],
//     projectTitle: "React Project",
//     explanation: "A basic React application with Tailwind CSS",
//     files: {
//       "/App.js": {
//         code: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"min-h-screen bg-gray-100 p-8\">\n      <h1 className=\"text-3xl font-bold text-blue-600\">Hello World</h1>\n    </div>\n  );\n}`,
//         styles:
//           "min-h-screen, bg-gray-100, p-8, text-3xl, font-bold, text-blue-600",
//       },
//     },
//     setupInstructions: "npm install && npm run dev",
//   });

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "deepseek-chat",
//         messages: [
//           {
//             role: "system",
//             content: dedent`
//              User Requirements:
//              ${userPrompt}

//               You are an expert React developer. Always respond with valid JSON in this exact structure:
//               {
//                 "response": "${randomResponse} [project name]...",
//                 "updates": [{"operation":"creating","file":"filename"}],
//                 "projectTitle": "Project Name",
//                 "explanation": "Project description",
//                 "files": {
//                   "/App.js": {
//                     "code": "Complete code",
//                     "styles": "Tailwind classes"
//                   },
//                     "/components/Navbar.jsx": {
//                     "code": "Complete code",
//                     "styles": "Tailwind classes"
//                   }
//                 },
//                 "setupInstructions": "npm commands"
//               }
              
//               Rules:
//               1. Use React with Tailwind CSS
//               2. Only use lucide-react for icons
//               3. Write complete code (no placeholders)
//               4. Make production-ready designs
//               5. For multi-page sites, create 5+ components
//               6. Focus on functionality for single-page apps
//             `,
//           },
//           {
//             role: "user",
//             content: userPrompt || "Create a React project with Tailwind CSS",
//           },
//         ],
//         temperature: 0.7,
//         max_tokens: 3000,
//         response_format: "json",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${API_KEY}`,
//         },
//         timeout: 10000,
//       }
//     );

//     const extractJSON = (text) => {
//       try {
//         return JSON.parse(text);
//       } catch {
//         const jsonMatch = text.match(/\{(?:[^{}]|(?:\{(?:[^{}])*\})*)\}/);
//         return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
//       }
//     };

//     const responseText = response.data?.choices?.[0]?.message?.content;
//     if (!responseText) throw new Error("Empty response from API");

//     const jsonResponse = extractJSON(responseText) || getFallbackResponse();

//     if (!jsonResponse.files || !jsonResponse.response) {
//       console.warn("Invalid response structure, using fallback");
//       return getFallbackResponse();
//     }

//     const processedFiles = {};
//     for (const [path, file] of Object.entries(jsonResponse.files)) {
//       processedFiles[path] = {
//         code: (file.code || "").replace(/\\n/g, "\n").replace(/\\"/g, '"'),
//         styles: file.styles || "",
//       };
//     }

//     return {
//       ...jsonResponse,
//       files: processedFiles,
//     };
//   } catch (error) {
//     console.error("API Error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//     });

//     if (error.response?.status === 402) {
//       return {
//         error: "API Limit Reached",
//         details: "The free tier has been exceeded",
//         ...getFallbackResponse(),
//       };
//     }

//     return {
//       error: "API Service Error",
//       details: error.message,
//       ...getFallbackResponse(),
//     };
//   }
// };

// module.exports = generateCodeFromAI;


// const axios = require("axios");
// const dedent = require("dedent");

// const generateCodeFromAI = async (userPrompt) => {
//   const API_KEY = process.env.DEEPSEEK_API;

//   if (!API_KEY) {
//     return {
//       error: "API key missing",
//       details: "Set DEEPSEEK_API environment variable",
//     };
//   }

//   const API_URL = "https://api.deepseek.com/v1/chat/completions";

//   // Fallback response if API fails
//   const getFallbackResponse = () => ({
//     response: "Here's a basic React starter template:",
//     updates: [{ operation: "creating", file: "App.js" }],
//     projectTitle: "React Starter",
//     explanation: "Default project with Tailwind CSS",
//     files: {
//       "/App.js": {
//         code: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 p-8">\n      <h1 className="text-3xl font-bold text-blue-600">Hello World</h1>\n    </div>\n  );\n}`,
//         styles:
//           "min-h-screen, bg-gray-50, p-8, text-3xl, font-bold, text-blue-600",
//       },
//     },
//     setupInstructions: "npm install && npm run dev",
//   });

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "deepseek-chat", // Free model
//         messages: [
//           {
//             role: "system",
//             content: dedent`
//               Generate React code with:
//               1. Tailwind CSS styling
//               2. Only lucide-react icons
//               3. Valid JSON output format:
//               {
//                 "response": "...",
//                 "updates": [],
//                 "projectTitle": "...",
//                 "explanation": "...",
//                 "files": {
//                   "/App.js": {
//                     "code": "...",
                   
//                   },
//                   "/components/Navbar.js": {
//                     "code": "...",
                   
//                   }
//                 },
//                 "setupInstructions": "..."
//               }
//             `,
//           },
//           {
//             role: "user",
//             content: userPrompt || "Create a simple React app",
//           },
//         ],
//         temperature: 0.7,
//         max_tokens: 2000, // Conservative limit for free tier
//         response_format: { type: "json_object" },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${API_KEY}`,
//         },
//         timeout: 8000, // 8-second timeout
//       }
//     );

//     // Parse response
//     let responseData;
//     try {
//       const responseText = response.data.choices[0].message.content;
//       // Clean response (remove markdown code blocks if present)
//       const cleanedResponse = responseText
//         .replace(/^```json/, "")
//         .replace(/```$/, "")
//         .trim();
//       responseData = JSON.parse(cleanedResponse);
//     } catch (e) {
//       console.warn("Failed to parse response, using fallback");
//       return getFallbackResponse();
//     }

//     // Validate response structure
//     if (!responseData.files || typeof responseData.files !== "object") {
//       console.warn("Invalid files structure, using fallback");
//       return getFallbackResponse();
//     }

//     return responseData;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     return {
//       error: "API request failed",
//       details: error.message,
//       ...getFallbackResponse(),
//     };
//   }
// };

// module.exports = generateCodeFromAI;

const axios = require("axios");
const dedent = require("dedent");

const generateCodeFromAI = async (userPrompt) => {
  // Free tier configuration
  const FREE_API_URL = "https://api.deepseek.com/v1/chat/completions";
  const FREE_MODEL = "deepseek-chat";
  const API_KEY = process.env.DEEPSEEK_API_FREE; // Different key for free tier

  if (!API_KEY) {
    return {
      error: "Free tier API key missing",
      details: "Set DEEPSEEK_API_FREE environment variable",
    };
  }

  // Fallback response generator
  const getFallbackResponse = () => ({
    response: "Here's a basic React template (fallback):",
    updates: [{ operation: "creating", file: "App.js" }],
    projectTitle: "React Starter",
    explanation: "Default project with Tailwind CSS",
    files: {
      "/App.js": {
        code: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-50 p-4">\n      <h1 className="text-2xl font-bold text-blue-500">Welcome</h1>\n      <p className="mt-2 text-gray-600">Edit this to get started</p>\n    </div>\n  );\n}`,
        styles:
          "min-h-screen, bg-gray-50, p-4, text-2xl, font-bold, text-blue-500, mt-2, text-gray-600",
      },
    },
    setupInstructions: "npm install && npm run dev",
  });

  try {
    const response = await axios.post(
      FREE_API_URL,
      {
        model: FREE_MODEL,
        messages: [
          {
            role: "system",
            content: dedent`
              Generate React code with:
              1. Tailwind CSS only
              2. Simple components
              3. Free-tier compatible features only
              4. JSON format:
              {
                "response": "...",
                "updates": [],
                "projectTitle": "...",
                "explanation": "...",
                "files": { "/file.js": { "code": "...", "styles": "..." } },
                "setupInstructions": "..."
              }
            `,
          },
          {
            role: "user",
            content: userPrompt || "Create a simple React component",
          },
        ],
        temperature: 0.7,
        max_tokens: 1500, // Lower limit for free tier
        response_format: { type: "json_object" },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        timeout: 5000, // Shorter timeout for free tier
      }
    );

    // Simplified response processing
    try {
      const content = response.data.choices[0].message.content;
      const cleanJSON = content.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanJSON);
    } catch {
      return getFallbackResponse();
    }
  } catch (error) {
    console.error("Free API Error:", error.message);
    return {
      error: "Free tier limit reached",
      details: "Try again later or upgrade your plan",
      ...getFallbackResponse(),
    };
  }
};

module.exports = generateCodeFromAI;