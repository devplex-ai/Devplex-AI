const axios = require("axios");
const dedent = require("dedent");

const generateCodeFromAI = async (userPrompt) => {
  const API_KEY = process.env.DEEPSEEK_API;

  if (!API_KEY) {
    console.error("Error: Missing DEEPSEEK_API key in environment variables.");
    return {
      error: "API key is missing",
      details: "Please check your environment configuration",
    };
  }

  const API_URL = "https://api.deepseek.com/v1/chat/completions";

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

  const CODE_GEN_PROMPT = {
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "system",
        content: dedent`
          # Two-Phase Response System

          ## Phase 1: Conversational Introduction (ALWAYS START WITH THIS)
          Respond conversationally to the user's request first, then proceed with the structured output.
          
          Example Response Format:
          "${randomResponse} [Project Type]: [Brief 2-3 sentence explanation of the approach]. 
          I'll generate a complete React project with [Key Features]."

          ## Phase 2: Structured Output (After conversational intro)
          Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension. 
          Use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library when necessary.

          USER REQUIREMENTS:
          ${userPrompt || "No additional requirements provided"}
          
          RESPONSE REQUIREMENTS:
          - Return valid JSON only, beginning with { and ending with }
          - Follow this exact structure:
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
    }
  },
  "setupInstructions": "npm install && npm run dev"
}


          IMPORTANT RULES:
          1. Make beautiful, production-ready designs
          2. Use lucide-react icons when appropriate
          3. Apply UI/UX best practices
          4. Write complete logic (no placeholder comments)
          5. Use modern React patterns (hooks, etc.)
          6. For multi-page sites, create at least 5 components
          7. Focus on functionality for single-page apps
        `,
      },
      {
        role: "user",
        content: userPrompt || "Create a React project with Tailwind CSS",
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
    response_format: { type: "json_object" },
  };

  try {
    const response = await axios.post(API_URL, CODE_GEN_PROMPT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const responseText = response.data?.choices?.[0]?.message?.content;

    if (!responseText) {
      console.error("No response text found in API response");
      return {
        error: "No response text found",
        details: "The API response did not contain the expected text",
        fullResponse: response.data,
      };
    }

    let jsonResponse;
    try {
      // Clean and parse the JSON response
      const cleanedResponse = responseText
        .replace(/^```(json)?\n/, "")
        .replace(/```$/, "")
        .trim();

      jsonResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);

      // Try to extract JSON from malformed response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          jsonResponse = JSON.parse(jsonMatch[0]);
        } catch (secondAttemptError) {
          console.error("Secondary parsing failed:", secondAttemptError);
          return {
            error: "Invalid JSON response from AI",
            details: secondAttemptError.message,
            rawResponse: responseText,
          };
        }
      } else {
        return {
          error: "No valid JSON found in response",
          details: parseError.message,
          rawResponse: responseText,
        };
      }
    }

    // Validate the response structure
    if (!jsonResponse.files || typeof jsonResponse.files !== "object") {
      return {
        error: "Invalid project structure",
        details: "Response missing required 'files' object",
        response: jsonResponse,
      };
    }

    // Process file contents to ensure proper formatting
    const processedFiles = {};
    for (const [path, file] of Object.entries(jsonResponse.files)) {
      processedFiles[path] = {
        code: file.code
          ? file.code.replace(/\\n/g, "\n").replace(/\\"/g, '"')
          : "",
        styles: file.styles || "",
      };
    }

    return {
      ...jsonResponse,
      files: processedFiles,
    };
  } catch (error) {
    console.error("AI Service Error:", {
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
