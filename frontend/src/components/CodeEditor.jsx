// import React,{useState} from 'react'
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
//   SandpackFileExplorer,


// } from "@codesandbox/sandpack-react";
// import { act } from 'react';
// import { Code, FolderInput, GalleryThumbnails, Maximize, Minimize, Rocket } from 'lucide-react';
// import Lookup from '../../Data/Lookup';

// const CodeEditor = () => {
//   const [activeTab, setActiveTab] = useState('code');
//   const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
//    const [isMaximized, setIsMaximized] = useState(false);

//   return (
//     <div>
//       <div className="bg-[#181818] w-full p-2 border border-white/10 flex items-center justify-between ">
//         <div className="flex bg-black p-2 w-fit rounded items-center gap-2 flex-wrap shrink-0">
//           <h2
//             onClick={() => {
//               setActiveTab("code");
//             }}
//             className={`text-sm flex gap-1 items-center cursor-pointer py-1 px-2 rounded hover:bg-gray-800 ${
//               activeTab === "code"
//                 ? "text-blue-600 bg-gray-800  bg-opacity-25"
//                 : "text-gray-300 bg-gray-900"
//             }`}
//           >
//             Code
//             <Code size={20} />
//           </h2>

//           <h2
//             onClick={() => {
//               setActiveTab("preview");
//             }}
//             className={`text-sm cursor-pointer flex gap-1 items-center py-1 px-2 rounded hover:bg-gray-800 ${
//               activeTab === "preview"
//                 ? "text-blue-600 bg-gray-800  bg-opacity-25"
//                 : "text-gray-300 bg-gray-900"
//             }`}
//           >
//             Preview
//             <GalleryThumbnails size={20} />
//           </h2>
//         </div>
//       </div>
//       <SandpackProvider
//         files={files}
//         template="react"
//         theme={"dark"}
//         customSetup={{
//           dependencies: {
//             ...Lookup.DEPENDENCY,
//           },
//         }}
//         options={{
//           externalResources: [
//             "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
//           ],
//         }}
//       >
//         <SandpackLayout>
//           {activeTab === "code" ? (
//             <>
//               <div className="flex flex-col ">
//                 <h1 className=" text-sm h-10 flex items-center px-2 text-gray-200 bg-[#181818] border-b border-white/10">
//                   Files
//                 </h1>
//                 <SandpackFileExplorer style={{ height: "75vh" }} />
//               </div>
//               <SandpackCodeEditor style={{ height: "80vh" }} />
//             </>
//           ) : (
//             <>
//               {/* <SandpackPreview
//                 style={{ height: "80vh" }}
//                 showNavigator={true}
//               /> */}
//               <div
//                 className={`transition-all duration-300 bg-white ${
//                   isMaximized
//                     ? "fixed top-0 left-0 w-full h-screen z-[9999]"
//                     : "relative w-full h-[80vh]"
//                 }`}
//               >
//                 <button
//                   onClick={() => setIsMaximized(!isMaximized)}
//                   className="absolute top-0 right-0 z-[10000] px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition"
//                 >
//                   {isMaximized ? (
//                     <Minimize size={20} />
//                   ) : (
//                     <Maximize size={20} />
//                   )}
//                 </button>
//                 <SandpackPreview
//                   showNavigator={true}
//                   className="w-full h-full"
//                 />
//               </div>
//             </>
//           )}
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// }

// export default CodeEditor

// import React, { useState, useEffect } from "react";
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
//   SandpackFileExplorer,
// } from "@codesandbox/sandpack-react";
// import axios from "axios";
// import { Code, GalleryThumbnails, Maximize, Minimize } from "lucide-react";

// const CodeEditor = ({ sessionId }) => {
//   const [activeTab, setActiveTab] = useState("code");
//   const [files, setFiles] = useState({});
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjectFiles = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/projects/${sessionId}`);
//         const { files } = response.data;

//         if (!files || files.length === 0) {
//           setError("No files found in this project.");
//           setLoading(false);
//           return;
//         }

//         // Convert fetched files into Sandpack's format
//         const formattedFiles = {};
//         files.forEach((file) => {
//           formattedFiles[`/${file.filename}`] = { code: file.code };
//         });

//         setFiles(formattedFiles);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching project files:", err);
//         setError("Failed to load project files.");
//         setLoading(false);
//       }
//     };

//     if (sessionId) fetchProjectFiles();
//   }, [sessionId]);

//   if (loading) return <p className="text-gray-300 p-4">Loading...</p>;
//   if (error) return <p className="text-red-500 p-4">{error}</p>;

//   return (
//     <div>
//       <div className="bg-[#181818] w-full p-2 border border-white/10 flex items-center justify-between">
//         <div className="flex bg-black p-2 w-fit rounded items-center gap-2 flex-wrap shrink-0">
//           <h2
//             onClick={() => setActiveTab("code")}
//             className={`text-sm flex gap-1 items-center cursor-pointer py-1 px-2 rounded hover:bg-gray-800 ${
//               activeTab === "code"
//                 ? "text-blue-600 bg-gray-800 bg-opacity-25"
//                 : "text-gray-300 bg-gray-900"
//             }`}
//           >
//             Code <Code size={20} />
//           </h2>

//           <h2
//             onClick={() => setActiveTab("preview")}
//             className={`text-sm cursor-pointer flex gap-1 items-center py-1 px-2 rounded hover:bg-gray-800 ${
//               activeTab === "preview"
//                 ? "text-blue-600 bg-gray-800 bg-opacity-25"
//                 : "text-gray-300 bg-gray-900"
//             }`}
//           >
//             Preview <GalleryThumbnails size={20} />
//           </h2>
//         </div>
//       </div>

//       <SandpackProvider files={files} template="react" theme="dark">
//         <SandpackLayout>
//           {activeTab === "code" ? (
//             <>
//               <div className="flex flex-col">
//                 <h1 className="text-sm h-10 flex items-center px-2 text-gray-200 bg-[#181818] border-b border-white/10">
//                   Files
//                 </h1>
//                 <SandpackFileExplorer style={{ height: "75vh" }} />
//               </div>
//               <SandpackCodeEditor style={{ height: "80vh" }} />
//             </>
//           ) : (
//             <div
//               className={`transition-all duration-300 bg-white ${
//                 isMaximized
//                   ? "fixed top-0 left-0 w-full h-screen z-[9999]"
//                   : "relative w-full h-[80vh]"
//               }`}
//             >
//               <button
//                 onClick={() => setIsMaximized(!isMaximized)}
//                 className="absolute top-0 right-0 z-[10000] px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition"
//               >
//                 {isMaximized ? <Minimize size={20} /> : <Maximize size={20} />}
//               </button>
//               <SandpackPreview showNavigator className="w-full h-full" />
//             </div>
//           )}
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// };

// export default CodeEditor;
import React, { useState, useEffect, useCallback,  } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import {
  Code,
  GalleryThumbnails,
  Maximize,
  Minimize,
  RefreshCw,
} from "lucide-react";
import Lookup from '../../Data/Lookup';
const CodeEditor = ({sessionId}) => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const [isMaximized, setIsMaximized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const apiURL = import.meta.env.VITE_BASE_URL;



   const fetchProjectFiles = useCallback(async () => {
   

     if (!sessionId) {
       setFiles(Lookup.DEFAULT_FILE);
       return;
     }

     try {
       setLoading(true);
       setError(null);

       const response = await axios.get(`${apiURL}/api/projects/${sessionId}`);

     
       const { files: responseFiles } = response.data;

       if (!Array.isArray(responseFiles)) {
         throw new Error("Server returned invalid files format");
       }

       if (responseFiles.length === 0) {
         setFiles(Lookup.DEFAULT_FILE);
         setError("No files found in this project.");
         return;
       }

       const formattedFiles = {};
       for (const file of responseFiles) {
         if (!file || !file.filename) {
           console.warn("Skipping invalid file:", file);
           continue;
         }

         const safeFilename = file.filename.startsWith("/")
           ? file.filename
           : `/${file.filename}`;

         formattedFiles[safeFilename] = {
           code: typeof file.code === "string" ? file.code : "",
           type: file.type || "tsx",
         };
       }

       const mergedFiles = { ...Lookup.DEFAULT_FILE, ...formattedFiles };

       setFiles(mergedFiles);
     } catch (err) {
       console.error("Fetch error:", err);
       setError(
         err.response?.data?.message ||
           err.message ||
           "Failed to load project files"
       );
       setFiles(Lookup.DEFAULT_FILE);
     } finally {
       setLoading(false);
     }
   }, [sessionId]);

  useEffect(() => {
    fetchProjectFiles();
  }, [fetchProjectFiles]); 

  // Optional: Manually trigger file refresh
  const handleRefresh = () => {
    fetchProjectFiles();
  };

  if (loading) return <p className="text-gray-300 p-4">Loading...</p>;

  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border border-white/10 flex items-center justify-between">
        <div className="flex bg-black p-2 w-fit rounded items-center gap-2 flex-wrap shrink-0">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm flex gap-1 items-center cursor-pointer py-1 px-2 rounded hover:bg-gray-800 ${
              activeTab === "code"
                ? "text-blue-600 bg-gray-800 bg-opacity-25"
                : "text-gray-300 bg-gray-900"
            }`}
          >
            Code <Code size={20} />
          </h2>

          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer flex gap-1 items-center py-1 px-2 rounded hover:bg-gray-800 ${
              activeTab === "preview"
                ? "text-blue-600 bg-gray-800 bg-opacity-25"
                : "text-gray-300 bg-gray-900"
            }`}
          >
            Preview <GalleryThumbnails size={20} />
          </h2>
        </div>

        <button
          onClick={handleRefresh}
          className="text-gray-300 hover:text-white flex items-center gap-2 bg-gray-800 px-3 py-1 rounded"
        >
          <RefreshCw size={16} /> Refresh Files
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {error}
        </div>
      )}

      <SandpackProvider
        files={files}
        theme="dark"
        template="react"
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDENCY,
          },
          entry: "/index.js", 
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <div className="flex flex-col">
                <h1 className="text-sm h-10 flex items-center px-2 text-gray-200 bg-[#181818] border-b border-white/10">
                  Files
                </h1>
                <SandpackFileExplorer style={{ height: "75vh" }} />
              </div>
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <div
              className={`transition-all duration-300 bg-white ${
                isMaximized
                  ? "fixed top-0 left-0 w-full h-screen z-[9999]"
                  : "relative w-full h-[80vh]"
              }`}
            >
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="absolute top-0 right-0 z-[10000] px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition"
              >
                {isMaximized ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <SandpackPreview showNavigator className="w-full h-full" />
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeEditor;
