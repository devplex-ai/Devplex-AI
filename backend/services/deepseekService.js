const axios = require("axios");

const generateCodeFromAI = async (userPrompt) => {
  const API_KEY = process.env.DEEPSEEK_API_KEY; // Use your DeepSeek API key

  if (!API_KEY) {
    console.error("Error: Missing DEEPEEK_API_KEY in environment variables.");
    return {
      error: "API key is missing",
      details: "Please check your environment configuration",
    };
  }

  const API_URL = "https://api.deepseek.ai/v1/code-generate"; // Replace with actual API URL from DeepSeek
const responses = [
  "Alright! Here's how we'll create your",
  "Great! Let's build your",
  "Okay! Here's the plan for your",
  "Let's enhance this feature! We'll create your",
  "No problem! Here's how we'll approach your",
  "Let's get started! We'll create your",
];
const randomResponse = responses[Math.floor(Math.random() * responses.length)];

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
Example format:
  Creating: App.js 
  Updating: components/Navbar.jsx

---
## Phase 2: Structured Output (After conversational intro)
Generate a COMPLETE production-ready React project with JavaScript and Tailwind CSS.
The design should follow the latest UI/UX trends, ensuring a clean, professional, and visually appealing interface.
The output must be a fully functional application with all necessary components, styles, and logic.

USER REQUIREMENTS:
${userPrompt || "No additional requirements provided"}

TECHNICAL REQUIREMENTS:
1. Project Structure:
   - Use App.js as the main application file (NOT App.jsx)
   - All components/pages must use .jsx extension (e.g., Navbar.jsx, Home.jsx)
   - Use functional components with JavaScript only
   - Follow React best practices with proper file organization
   - Include proper JavaScript prop validation
   - NO TypeScript - use JavaScript only
   - Use modern React hooks (useState, useEffect, useContext, useRef, etc.)
   

2. Component Requirements:
   - Minimum 5 meaningful components
   - Each component must be fully self-contained with all necessary imports
   - Include proper props validation using PropTypes
   - Implement appropriate state management
   - Complete JSX structure with no placeholders
   - Use meaningful and descriptive component names

3. Styling Requirements:
   - Use Tailwind CSS for all styling
   - Do NOT use backticks within Tailwind class strings
   - Use className="text-blue-500" format (not className=\`text-blue-500\`)
   - Implement mobile-first responsive design
   - Use consistent spacing utilities (px-4, py-2, etc.)
   - Include responsive breakpoints (sm, md, lg, xl)
   - Implement dark mode support with dark: prefix classes
   - Add hover/focus states using hover: and focus: prefixes
   - Include smooth transitions with transition classes
   - Ensure accessible color contrast

4. Accessibility:
   - Use semantic HTML elements (header, nav, main, section, etc.)
   - Include appropriate ARIA attributes
   - Implement keyboard navigation support
   - Ensure proper focus management
   - Add screen reader support with sr-only classes when needed

5. Code Quality:
   - Implement proper error handling with try/catch blocks
   - Add loading states for async operations
   - Maintain clean code structure with consistent formatting
   - Include JSDoc comments for functions and components
   - Follow ESLint conventions
   - Use Prettier-compatible formatting
   - Include all necessary imports at the top of each file
   - Avoid nested ternary operators
   
   - Use date-fns for date formatting and react-chartjs-2 for charts/graphs if necessary
   - Include all required import statements for external libraries
   - Use lucide-react for icons with proper imports
   - Find and use high-quality, royalty-free images
   - Make all designs production-worthy, not generic

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

EXAMPLE OUTPUT:
{
  "response": "I'll create a complete Task Management Dashboard for you. This will include user authentication, task creation/editing, priority management, and a statistics dashboard.",
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
  "projectTitle": "Task Management Dashboard",
  "explanation": "A responsive task management dashboard with dark mode support, user authentication, and task tracking features",
   
  "files": {
    "/components/Navbar.jsx": {
      "code": "import React, { useState } from 'react';\nimport PropTypes from 'prop-types';\nimport { Menu, Search } from 'lucide-react';\n\nconst Navbar = ({ toggleSidebar }) => {\n  const [searchQuery, setSearchQuery] = useState('');\n  \n  return (\n    <nav className=\"bg-white shadow-sm py-3 px-6 flex items-center justify-between sticky top-0 z-10 dark:bg-gray-800 dark:text-white\">\n      <div className=\"flex items-center space-x-4\">\n        <button \n          onClick={toggleSidebar}\n          className=\"md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white\"\n          aria-label=\"Toggle sidebar\"\n        >\n          <Menu size={24} />\n        </button>\n        <h1 className=\"text-xl font-semibold text-gray-800 dark:text-white\">Dashboard</h1>\n      </div>\n      \n      <div className=\"flex-1 max-w-md mx-4 hidden md:block\">\n        <div className=\"relative\">\n          <Search className=\"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400\" size={18} />\n          <input\n            type=\"text\"\n            placeholder=\"Search...\"\n            className=\"w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white\"\n            value={searchQuery}\n            onChange={(e) => setSearchQuery(e.target.value)}\n            aria-label=\"Search dashboard\"\n          />\n        </div>\n      </div>\n      \n      <div className=\"flex items-center space-x-4\">\n        <button className=\"p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700\" aria-label=\"Notifications\">\n          <div className=\"relative\">\n            <span className=\"absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500\"></span>\n          </div>\n        </button>\n        <div className=\"h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium\">\n          JD\n        </div>\n      </div>\n    </nav>\n  );\n};\n\nNavbar.propTypes = {\n  toggleSidebar: PropTypes.func.isRequired\n};\n\nexport default Navbar;",
      "styles": "bg-white, dark:bg-gray-800, shadow-sm, py-3, px-6, flex, items-center, justify-between, sticky, top-0, z-10, text-gray-600, hover:text-gray-900, dark:text-gray-300, dark:hover:text-white, text-xl, font-semibold"
    }
  },
  "setupInstructions": "npm install prop-types lucide-react && npm run dev"
}

IMPORTANT RULES:
1. EVERY component must be fully complete and production-ready
2. Include ALL necessary imports for EVERY component (React, hooks, PropTypes, external libraries)
3. Use PropTypes for proper JavaScript prop validation
4. Style EVERY visible element with Tailwind classes (NO backticks in className values)
5. Include responsive design for all screen sizes
6. Include NO placeholder comments - only actual working code
7. Ensure all components are connected and work together properly
8. Install and import PropTypes for all components with props
9. Use JavaScript only - NO TypeScript
10. Include ALL required imports at the top of each file
11. Generate VALID, WELL-FORMED JSON output only

RESPONSE FORMAT:
Your response must be valid JSON ONLY, beginning with { and ending with }.
Do not wrap the response in markdown or add any extraneous text.
All strings in JSON must be properly escaped with double quotes.

IMPORTANT: Your response MUST be valid JSON ONLY. Do not wrap the response in markdown code blocks or backticks of any kind.
The response must begin with { and end with } with properly escaped strings inside.
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "deepseek-r1", // Specify the correct model if needed
        prompt: CODE_GEN_PROMPT,
        max_tokens: 4096,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseText = response.data?.response; // Adjust based on actual response format

    if (!responseText) {
      console.error("No response text found in API response");
      return {
        error: "No response text found",
        details: "DeepSeek API did not return the expected response",
        fullResponse: response.data,
      };
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      return {
        error: "Invalid JSON response from AI",
        details: parseError.message,
        rawResponse: responseText,
      };
    }

    return jsonResponse;
  } catch (error) {
    console.error("DeepSeek API Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return {
      error: "Failed to process AI response",
      details: error.message,
      code: "DEEPEEK_API_ERROR",
    };
  }
};

module.exports = generateCodeFromAI;
