// const axios = require("axios");
// const dedent = require("dedent");

// const MAX_RETRIES = 2;

// const generateCodeFromAI = async (userPrompt, retryCount = 0) => {
//   const API_KEY = process.env.CLAUDE_API_KEY;

//   if (!API_KEY) {
//     console.error("Error: Missing CLAUDE_API_KEY in environment variables.");
//     return {
//       error: "API key is missing",
//       details: "Please check your environment configuration",
//     };
//   }

//   const API_URL = `https://openrouter.ai/api/v1/chat/completions`;

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

//  const CODE_GEN_PROMPT = `
// # Two-Phase Response System

// ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
// Respond conversationally to the user's request first, then proceed with the structured output.

// Example Response Format:
// "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
// I'll generate a complete React project with [Key Features]."

// Provide step-by-step updates on file operations in a structured and natural format.
// Each update should mention the operation (Creating, Updating, Deleting) and the file name.
// Keep it concise, clear, and human-readable without JSON formatting.

// ---
// ## Phase 2: Structured Output (After conversational intro)
// Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in the components folder at the root level. DO NOT use a src folder structure - all files should be at root level or in the components folder directly at root level.

// IMPORTANT FILE STRUCTURE: 
// - Root folder
//   - components/
//     - YourComponent.jsx
//   - App.js (at root level)
//   - index.js (at root level)

// USER REQUIREMENTS:
// ${userPrompt || "No additional requirements provided"}

// Return the response in JSON format with the following schema:

// OUTPUT FORMAT REQUIREMENTS (strict JSON):
// {
//   "response": "Conversational Introduction",
//   "updates": [
//     {
//       "operation": "creating",
//       "file": "App.jsx"
//     },
//     {
//       "operation": "creating",
//       "file": "components/Navbar.jsx"
//     }
//   ],
//   "projectTitle": "Descriptive project title",
//   "explanation": "Detailed description of the project",
  
//   "files": {
//     "components/ComponentName.jsx": {
//       "code": "// Complete JavaScript component code with all imports",
//       "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
//     },
//     "App.jsx": {
//       "code": "// Complete main application code with all imports"
//     }
//   },
//   "setupInstructions": "npm install && npm run dev"
// }

// IMPORTANT NOTES:
// 1. DO NOT use src/ folder structure - all files are at root level or in root/components/
// 2. Your response MUST be valid JSON without backticks in your JSON response
// 3. For filepaths, do not include a leading slash (use "components/File.jsx" NOT "/components/File.jsx")
// 4. Replace backticks with single quotes or escaped double quotes in code sections
// 5. All components should use .jsx extension, not .js

// STYLING Guidelines:
// - Use beautiful UI/UX principles
// - Use modern typography and responsive layouts
// - Use proper padding, margins, and spacing
// - Add interactive elements with hover, focus animations
// - Use primary color palettes
// - Ensure contrast & accessibility
// - Apply drop shadows and smooth transitions
// - Use rounded corners for elements
// - Implement card-based layouts where necessary
// - Create modern input fields for forms

// Your response must be valid JSON ONLY, beginning with { and ending with }.
// Do not wrap the response in markdown or add any extraneous text.
// `;

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "anthropic/claude-3.7-sonnet",
//         messages: [
//           {
//             role: "user",
//             content: CODE_GEN_PROMPT,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "HTTP-Referer": "https://www.devplex.in",
//           "X-Title": "Devplex",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const responseText = response.data?.choices?.[0]?.message?.content;

//     if (!responseText) {
//       console.error("❌ No response text found in API response.");
//       return {
//         error: "No response text",
//         details: "AI response was empty",
//         fullResponse: response.data,
//       };
//     }

//     const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
//     const jsonString = jsonMatch ? jsonMatch[1] : responseText;

//     let jsonResponse;
//     try {
//       jsonResponse = JSON.parse(jsonString);
//     } catch (parseError) {
//       console.error("❌ JSON Parsing Error:", parseError);

//       const jsonFallbackMatch = responseText.match(/\{[\s\S]*\}/);
//       if (jsonFallbackMatch) {
//         try {
//           jsonResponse = JSON.parse(jsonFallbackMatch[0]);
//         } catch (secondAttemptError) {
//           console.error("❌ Secondary parsing failed:", secondAttemptError);
//           return {
//             error: "Invalid JSON response",
//             details: secondAttemptError.message,
//             rawResponse: responseText,
//           };
//         }
//       } else {
//         return {
//           error: "No valid JSON found",
//           details: parseError.message,
//           rawResponse: responseText,
//         };
//       }
//     }

//     return jsonResponse;
//   } catch (error) {
//     console.error("❌ AI Service Error:", {
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
const axios = require("axios");

const MAX_RETRIES = 2;

const generateCodeFromAI = async (userPrompt, retryCount = 0) => {
  const API_KEY = process.env.CLAUDE_API_KEY;

  if (!API_KEY) {
    console.error("Error: Missing CLAUDE_API_KEY in environment variables.");
    return {
      error: "API key is missing",
      details: "Please check your environment configuration",
    };
  }

  const API_URL = `https://openrouter.ai/api/v1/chat/completions`;

  const responses = [
    "Alright! Here's how we'll create your",
    "Great! Let's build your",
    "Okay! Here's the plan for your",
    "Let's enhance this feature! We'll create your",
    "No problem! Here's how we'll approach your",
    "Let's get started! We'll create your",
  ];
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  // Improved prompt with clearer JSON formatting instructions
  const CODE_GEN_PROMPT = `
# Two-Phase Response System

## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
Respond conversationally to the user's request first, then proceed with the structured output.

Example Response Format:
"${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
I'll generate a complete React project with [Key Features]."

Provide step-by-step updates on file operations in a structured and natural format.
Each update should mention the operation (Creating, Updating, Deleting) and the file name.
Keep it concise, clear, and human-readable without JSON formatting.

---
## Phase 2: Structured Output (After conversational intro)
Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in the components folder at the root level. DO NOT use a src folder structure - all files should be at root level or in the components folder directly at root level.

USER REQUIREMENTS:
${userPrompt || "No additional requirements provided"}

IMPORTANT FILE STRUCTURE: 
- Root folder
  - components/
    - YourComponent.jsx
  - App.js (at root level)
  - index.js (at root level)



Return the response in JSON format with the following schema:

OUTPUT FORMAT REQUIREMENTS (strict JSON):
{
  "response": "Conversational Introduction",
  "updates": [
    {
      "operation": "creating",
      "file": "App.js"
    },
    {
      "operation": "creating",
      "file": "components/Navbar.jsx"
    }
  ],
  "projectTitle": "Descriptive project title",
  "explanation": "Detailed description of the project",
  
  "files": {
    "components/ComponentName.jsx": {
      "code": "// Complete JavaScript component code with all imports",
      "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
    },
    "App.js": {
      "code": "// Complete main application code with all imports"
    }
  },
  "setupInstructions": "npm install && npm run dev"
}

IMPORTANT NOTES:
1. DO NOT use src/ folder structure - all files are at root level or in root/components/
2. Your response MUST be valid JSON without backticks in your JSON response
3. For filepaths, do not include a leading slash (use "components/File.jsx" NOT "/components/File.jsx")
4. App.js is already in root folder dont make App.jsx.
5. All components should use .jsx extension, not .js accept App.js, index.js.
6. CRITICAL: All quotes within code strings must be properly escaped with backslashes
7. DO NOT use any special characters that would break JSON formatting
8. DO NOT include any comments outside of the JSON structure

STYLING Guidelines:
- Use beautiful UI/UX principles
- Use modern typography and responsive layouts
- Use proper padding, margins, and spacing
- Add interactive elements with hover, focus animations
- Use primary color palettes
- Ensure contrast & accessibility
- Apply drop shadows and smooth transitions
- Use rounded corners for elements
- Implement card-based layouts where necessary
- Create modern input fields for forms

Your response must be valid JSON ONLY, beginning with { and ending with }.
Do not wrap the response in markdown or add any extraneous text.
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "anthropic/claude-3.7-sonnet",
        messages: [
          {
            role: "user",
            content: CODE_GEN_PROMPT,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://www.devplex.in",
          "X-Title": "Devplex",
          "Content-Type": "application/json",
        },
      }
    );

    const responseText = response.data?.choices?.[0]?.message?.content;

    if (!responseText) {
      console.error("❌ No response text found in API response.");
      return {
        error: "No response text",
        details: "AI response was empty",
        fullResponse: response.data,
      };
    }

    // Enhanced parsing logic with better error handling
    let cleanedText = responseText;

    // Remove any markdown code blocks
    const jsonMatch = cleanedText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanedText = jsonMatch[1];
    }

    // Try to find the JSON object
    const jsonObjectMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonObjectMatch) {
      cleanedText = jsonObjectMatch[0];
    }

    // Clean up common JSON issues
    cleanedText = cleanedText
      .replace(/\\`/g, "\\'") // Replace escaped backticks with escaped single quotes
      .replace(/`/g, "'") // Replace any remaining backticks with single quotes
      .replace(/\\(?!["\\/bfnrt])/g, "\\\\"); // Escape backslashes that aren't part of valid escape sequences

    // Try parsing with specific error details
    try {
      const jsonResponse = JSON.parse(cleanedText);
      return jsonResponse;
    } catch (parseError) {
      console.error("❌ JSON Parsing Error:", parseError);

      // If we're within retry limits, try again
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying request (${retryCount + 1}/${MAX_RETRIES})...`);
        return generateCodeFromAI(userPrompt, retryCount + 1);
      }

      // If all parsing attempts fail, return structured error with details
      return {
        error: "Invalid JSON response",
        details: parseError.message,
        position: parseError.message.match(/position (\d+)/)?.[1] || "unknown",
        rawResponsePreview: cleanedText.substring(0, 200) + "...", // First 200 chars for debugging
        approximateErrorLocation: parseError.message.match(/position (\d+)/)
          ? cleanedText.substring(
              Math.max(
                0,
                parseInt(parseError.message.match(/position (\d+)/)[1]) - 50
              ),
              Math.min(
                cleanedText.length,
                parseInt(parseError.message.match(/position (\d+)/)[1]) + 50
              )
            )
          : "unknown",
      };
    }
  } catch (error) {
    console.error("❌ AI Service Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    // If we're within retry limits, try again for network/API errors
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Retrying request after error (${retryCount + 1}/${MAX_RETRIES})...`
      );
      return generateCodeFromAI(userPrompt, retryCount + 1);
    }

    return {
      error: "Failed to process AI response",
      details: error.message,
      code: "AI_SERVICE_ERROR",
    };
  }
};

module.exports = generateCodeFromAI;