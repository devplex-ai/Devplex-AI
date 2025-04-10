const axios = require("axios");
const dedent = require("dedent");

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

  const CODE_GEN_PROMPT = dedent(`
     # Two-Phase Response System
 
     ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
     Respond conversationally to the user's request first, then proceed with the structured output.
 
     Example Response Format:
     "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
     I'll generate a complete React project with [Key Features]."
 
     USER REQUIREMENTS:
     ${userPrompt || "No additional requirements provided"}
 
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
         "/components/ComponentName.jsx": {
           "code": "// Complete JavaScript component code with all imports",
           "styles": "Tailwind classes used (text-blue-500, p-4, etc.)"
         },
         "/App.js": {
           "code": "// Complete main application code with all imports"
         },
         "/package.json": {
           "code": "Install required Dependencies"
         }
       },
       "setupInstructions": "npm install && npm run dev"
     }
   `);

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
          "HTTP-Referer": "https://your-site-url.com",
          "X-Title": "Your Site Name",
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

    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ JSON Parsing Error:", parseError);

      const jsonFallbackMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonFallbackMatch) {
        try {
          jsonResponse = JSON.parse(jsonFallbackMatch[0]);
        } catch (secondAttemptError) {
          console.error("❌ Secondary parsing failed:", secondAttemptError);
          return {
            error: "Invalid JSON response",
            details: secondAttemptError.message,
            rawResponse: responseText,
          };
        }
      } else {
        return {
          error: "No valid JSON found",
          details: parseError.message,
          rawResponse: responseText,
        };
      }
    }

    return jsonResponse;
  } catch (error) {
    console.error("❌ AI Service Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return {
      error: "Failed to process AI response",
      details: error.message,
      code: "AI_SERVICE_ERROR",
    };
  }
};

module.exports = generateCodeFromAI;
