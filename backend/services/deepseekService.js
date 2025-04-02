const axios = require("axios");
const dedent = require("dedent");

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL_NAME = "deepseek/deepseek-r1:free"; // Updated model

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY environment variable.");
}

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

const responses = [
  "Alright! Here's how we'll create your",
  "Great! Let's build your",
  "Okay! Here's the plan for your",
  "Let's enhance this feature! We'll create your",
  "No problem! Here's how we'll approach your",
  "Let's get started! We'll create your",
];
const randomResponse = responses[Math.floor(Math.random() * responses.length)];



const CODE_GEN_PROMPT = dedent`
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
Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.


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

- Use Tailwind Classes for Adding styles to the elements.

- If user want to develop the full website the create atleat 5 pages more than 5 components like(Navbar, Footer, HeroSection, Testimonials, Contact form ,etc.)

- If there is no need to make a multiple page dont make it focus on functionality ok.

- Make better UI/UX. Apply UI/UX principals.

- Dont leave comment like this (Eg: //write logic for handel reset) please write full code logics etc.

- If you adding conditional rendering using turnary operator so please use backticks inside css or any logic.

- Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.

- When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required

- Add Emoji icons whenever needed to give good user experinence

- all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.

RESPONSE FORMAT:
- Your response must be valid JSON ONLY, beginning with { and ending with }.
- Do not wrap the response in markdown or add any extraneous text.



`;

const generateCodeFromAI = async (
  userPrompt,
  temperature = 0.7,
  maxTokens = 1024
) => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: CODE_GEN_PROMPT,
          },
          {
            role: "user",
            content: userPrompt || "Create a simple React component",
          },
        ],
        temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "YOUR_SITE_URL",
          "X-Title": "YOUR_APP_NAME",
        },
        timeout: 10000,
      }
    );

    try {
      const content = response.data.choices[0]?.message?.content || "";
      const cleanJSON = content.replace(/```json|```/g, "").trim();

      if (!cleanJSON)
        throw new Error("Empty response received from OpenRouter.");

      const result = JSON.parse(cleanJSON);

      if (!result.files || typeof result.files !== "object") {
        throw new Error("Invalid files structure in API response.");
      }

      return result;
    } catch (e) {
      console.warn("Response parsing failed, using fallback:", e.message);
      return getFallbackResponse();
    }
  } catch (error) {
    console.error("OpenRouter API Error:", {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    return {
      error: "API request failed",
      details: error.response?.data?.error?.message || error.message,
      ...getFallbackResponse(),
    };
  }
};

module.exports = generateCodeFromAI;
