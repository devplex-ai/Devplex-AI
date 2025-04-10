const axios = require("axios");
const dedent = require("dedent");

const generateCodeFromAI = async (userPrompt) => {
  const API_KEY = process.env.CLAUDE_API;

  if (!API_KEY) {
    console.error(
      "Error: Missing OPENROUTER_API_KEY in environment variables."
    );
    return {
      error: "API key is missing",
      details: "Please check your environment configuration",
    };
  }

  const API_URL = "https://openrouter.ai/api/v1/chat/completions";

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://www.devplex.in", // Replace with your actual domain in production
    "X-Title": "AI Code Generator",
  };

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
Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary.

USER REQUIREMENTS:
${userPrompt || "No additional requirements provided"}

IMPORTANT FILE STRUCTURE: 
- Root folder
  - components/
    - YourComponent.jsx
  -public/  
  - App.js (at root level)
  - index.js (at root level)
  - package.json (at root level)

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

IMPORTANT: Your response MUST be valid JSON. Do not use backticks in your JSON response, especially within the code sections - replace with single quotes or escaped double quotes as needed. Ensure all code is properly escaped for JSON.

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
            role: "system",
            content:
              "You are a coding assistant that generates React applications. Return valid JSON in the format specified by the user.",
          },
          {
            role: "user",
            content: CODE_GEN_PROMPT,
          },
        ],
      },
      { headers }
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

    // Extract JSON from AI response with better error handling
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("❌ No JSON object found in response");
      return {
        error: "No valid JSON found",
        details: "Could not extract JSON from response",
        rawResponse: responseText,
      };
    }

    let jsonString = jsonMatch[0];

    // Handle backticks in code (replace with single quotes)
    jsonString = jsonString.replace(/`([^`]*)`/g, "'$1'");

    // Remove any control characters that might cause JSON parsing to fail
    jsonString = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ JSON Parsing Error:", parseError);

      // Log the problematic section for debugging
      const errorPosition = parseInt(
        parseError.message.match(/position (\d+)/)?.[1]
      );
      if (errorPosition) {
        const start = Math.max(0, errorPosition - 50);
        const end = Math.min(jsonString.length, errorPosition + 50);
        console.error(
          `Problematic section: ${jsonString.substring(start, end)}`
        );
      }

      // Fallback: Try a more aggressive cleaning approach
      try {
        // Remove all backticks
        const cleanedJson = jsonString.replace(/`/g, "'");
        jsonResponse = JSON.parse(cleanedJson);
        console.log("Successfully parsed JSON after aggressive cleaning");
      } catch (secondError) {
        return {
          error: "Invalid JSON response",
          details: parseError.message,
          rawResponse: responseText,
        };
      }
    }

    // Process files to ensure clean code without escaped newlines
    const processedFiles = {};
    for (const [path, file] of Object.entries(jsonResponse.files || {})) {
      let codeContent = file.code
        ? file.code.replace(/\\n/g, "\n").replace(/\\"/g, '"')
        : "";

      processedFiles[path] = {
        code: codeContent,
        styles: file.styles || "",
      };
    }

    return {
      ...jsonResponse,
      files: processedFiles,
    };
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
