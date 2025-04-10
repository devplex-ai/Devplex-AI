// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import CodeEditor from "../components/CodeEditor";
// import AppSideBar from "../components/AppSideBar";
// import Avatar from "boring-avatars";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { ChevronDown, FolderGit2, FolderInput, Rocket, SquareChevronDown } from "lucide-react";
// import { useParams } from "react-router-dom";

// const WorkspacePage = () => {
//   const { sessionId } = useParams();
//   const { user } = useSelector((state) => state.auth);
//   const [chatHistory, setChatHistory] = useState([]);

//   const fetchChatHistory = async (sessionId) => {
//     try {
//       console.log(`Fetching chat history for sessionId: ${sessionId}`);

//       const response = await fetch(
//         `http://localhost:5000/api/chats/${sessionId}`
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         console.error(`Error fetching chat: ${data.error}`);
//         return { error: data.error };
//       }

//       console.log(
//         `Chat history fetched successfully. Messages count: ${data.messages.length}`
//       );
//       console.log(data.messages);
//       return data.messages;
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//       return { error: "Internal Server Error" };
//     }
//   };

//   useEffect(() => {
//     const getChatHistory = async () => {
//       const messages = await fetchChatHistory(sessionId); 

//       if (Array.isArray(messages)) {
//         setChatHistory(messages);
//       }
//     };

//     getChatHistory(); 
//   }, [sessionId]); 


//   return (
//     <div className="w-full bg-black h-screen flex flex-col gap-2 overflow-hidden">
//       <div className="w-full flex items-center justify-between px-4  h-14 border-b border-white/20">
//         <div className="ml-18 px-2 flex  gap-4 py-2  rounded bg-white/20  ">
//           <h1 className="text-white  flex items-center gap-2 text-sm">
//             <FolderGit2 size={20} className="text-gray-300" />
//             <span className="truncate max-w-[300px]">
//               Create Todo Application
//             </span>
//           </h1>
//           <ChevronDown size={20} className="text-gray-400" />
//         </div>
//         <div className="flex  w-fit items-center gap-2 flex-wrap shrink-0">
//           <div className="flex gap-1 items-center rounded bg-white/20 px-2 py-1">
//             <img src="/assets/coin.png" alt="coin" className="h-6" />
//             <h1 className="text-sm text-white ">500</h1>
//           </div>
//           <h2 className="text-sm flex gap-1 items-center text-gray-300 cursor-pointer bg-gray-900 hover:bg-gray-800 py-1 px-2 rounded">
//             Export
//             <FolderInput size={20} />
//           </h2>
//           <h2 className="text-sm flex gap-1 items-center text-white cursor-pointer bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded">
//             Deploy
//             <Rocket size={20} />
//           </h2>
//         </div>
//       </div>
//       <AppSideBar />
//       <div className="flex gap-4 px-8">
//         <div className="w-1/2 h-[90vh] flex flex-col justify-between gap-2 ml-14 border border-white/20 p-4 rounded">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="flex flex-col gap-2 h-[70vh] overflow-y-scroll scrollbar-none"
//           >
//             <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
//               <div className="w-10">
//                 <Avatar
//                   size={40}
//                   name={user?.name}
//                   variant="beam"
//                   colors={[
//                     "#FF6B6B",
//                     "#FFD93D",
//                     "#6BCB77",
//                     "#4D96FF",
//                     "#FF6EC7",
//                   ]}
//                 />
//               </div>
//               <h1 className="text-sm font-medium leading-loose break-words">
//                 Create Todo App
//               </h1>
//             </div>
//             <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
//               <h1 className="text-sm font-medium leading-loose break-words">
//                 Sure! Here’s how you can create a Todo App and enhance it with
//                 useful features: Start with a simple interface that lets users
//                 add, edit, and delete tasks easily. Then, make it smarter by
//                 adding due dates, reminders, and task prioritization so users
//                 can manage their day efficiently.
//               </h1>
//             </div>
//             <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
//               <div className="w-10">
//                 <Avatar
//                   size={40}
//                   name={user?.name}
//                   variant="beam"
//                   colors={[
//                     "#FF6B6B",
//                     "#FFD93D",
//                     "#6BCB77",
//                     "#4D96FF",
//                     "#FF6EC7",
//                   ]}
//                 />
//               </div>
//               <h1 className="text-sm font-medium leading-loose break-words">
//                 Add some new features which are helpful for
//               </h1>
//             </div>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className=" flex flex-col items-center w-full max-w-xl "
//           >
//             {/* Input Field */}
//             <textarea
//               type="text"
//               placeholder="How can Devplex help you today?"
//               value={prompt}
//               rows={6}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#608dff] placeholder-gray-400 text-white bg-transparent resize-none"
//               autoFocus
//             />
//           </motion.div>
//         </div>

//         <motion.div
//           className="w-full max-w-[65%] h-[85vh]"
//           initial={{ x: 100, opacity: 0, scale: 0.95 }}
//           animate={{ x: 0, opacity: 1, scale: 1 }}
//           transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
//         >
//           <CodeEditor sessionId={sessionId} />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default WorkspacePage;
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Avatar from 'react-avatar';
import CodeEditor from "../components/CodeEditor";
import AppSideBar from "../components/AppSideBar";
import { Bot, CheckCircle, FolderGit2, FolderInput, Link, Rocket } from "lucide-react";
import { Check } from "lucide-react";
import axios from "axios";
import { FaFigma } from "react-icons/fa";

const WorkspacePage = () => {
  const { sessionId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [newPrompt, setNewPrompt] = useState("");
  const [refetch, setRefetch] = useState(false);
  
  const [chatHistory, setChatHistory] = useState([]);
  const [userPromt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(user?.avatar);
 const apiURL = import.meta.env.VITE_BASE_URL;

  // Fetch Chat History
const fetchChatHistory = async () => {
  try {
    const response = await axios.get(`${apiURL}/api/chats/${sessionId}`);
    const data = response.data; // 

    console.log(data);
    if (!data || !data.messages) {
      console.error("Error fetching chat: No data or messages found");
      return;
    }

    const firstUserMessage = data.messages.find((msg) => msg.role === "user");
    if (firstUserMessage) {
      setUserPrompt(firstUserMessage.content);
    }

    setChatHistory(data.messages);
  } catch (error) {
    console.error(
      "Error fetching chat history:",
      error.response?.data || error
    );
  }
};


  useEffect(() => {
    fetchChatHistory();
  }, [sessionId]);

  const enhanceProject = async (newPrompt, sessionId) => {
    if (!newPrompt.trim()) return; 
    if (refetch === true) {
      setRefetch(false);
    }

      const userMessage = { role: "user", content: newPrompt };


      setChatHistory((prev) => [...prev, userMessage]);
      setNewPrompt("");
    setLoading(true);
    try {
      const res = await axios.post(`${apiURL}/api/enhance-chat`, {
        sessionId,
        prompt: newPrompt,
      });

      if (res.data.success) {
        const { updatedFiles, chat, project } = res.data;

        setChatHistory(chat.messages);
        setRefetch(true);
        console.log("API response:", res.data);
      } else {
        console.error("Enhance failed:", res.data.error);
      }
    } catch (error) {
      console.error(
        "Error enhancing project:",
        error.response?.data || error.message
      );
    } finally{
       setLoading(false);
    }
  };

  
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when chatHistory updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const deployProject = async (sessionId) => {
    const res = await axios.post(`/api/deploy/${sessionId}`);
    console.log("Deployed at:", res.data.siteUrl);
  };

  return (
    <div className="w-full bg-black h-screen flex flex-col gap-2 overflow-hidden">
      {/* Navbar */}
      <div className="w-full flex items-center justify-between px-4 h-14 border-b border-white/20">
        <div className="ml-18 px-2 flex gap-4 py-2 rounded bg-white/20">
          <h1 className="text-white flex items-center gap-2 text-sm">
            <FolderGit2 size={20} className="text-gray-300" />
            <span className="truncate max-w-[300px]">{userPromt}</span>
          </h1>
        </div>
        <div className="flex w-fit items-center gap-2 flex-wrap shrink-0">
          <div className="flex gap-1 items-center rounded bg-white/20 px-2 py-1">
            <img src="/assets/coin.png" alt="coin" className="h-6" />
            <h1 className="text-sm text-white">500</h1>
          </div>
          <h2 className="text-sm flex gap-1 items-center text-gray-300 cursor-pointer bg-gray-900 hover:bg-gray-800 py-1 px-2 rounded">
            Export <FolderInput size={20} />
          </h2>
          <h2 onClick={() => {
            deployProject(sessionId);
          }} className="text-sm flex gap-1 items-center text-white cursor-pointer bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded">
            Deploy <Rocket size={20} />
          </h2>
        </div>
      </div>

      <AppSideBar />

      <div className="flex gap-4 px-8">
        <div className="w-1/2 h-[90vh] flex flex-col justify-between gap-4 ml-14 border border-white/20 p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2"
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`w-full text-white py-4 px-5 rounded-lg ${
                  chat.role === "user"
                    ? "bg-gray-800/70 flex items-start gap-4"
                    : "bg-gray-800/70"
                } transition-all hover:bg-gray-700/90`}
              >
                <div className="flex-shrink-0">
                  {chat.role === "user" && (
                    <Avatar
                      src={userAvatar}
                      name={!user?.name ? user?.email : user?.name}
                      alt="User Avatar"
                      size={40}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white leading-relaxed break-words whitespace-pre-wrap">
                    {chat.content}
                  </p>

                  {chat.updates && chat.updates.length > 0 && (
                    <div className="mt-3 bg-black rounded-lg p-2">
                      <div className="text-xs text-gray-400 mb-1">
                        File updates:
                      </div>
                      <ul className="space-y-2">
                        {chat.updates.map((update, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                            <div>
                              <span className="text-white">
                                {update.operation}
                              </span>
                              <span className="text-blue-300 ml-2 font-mono text-xs">
                                {update.file}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Show Loading Indicator ONLY ONCE at the bottom */}
            {loading && (
              <div className="w-full bg-gray-800/70 text-white py-3 px-4 flex items-center gap-3 rounded-md animate-pulse">
                <video autoPlay loop muted className="w-12 rounded-full">
                  <source src="/assets/codevideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span>Generating response...</span>
              </div>
            )}

            <div ref={bottomRef} className="h-0" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className=" flex flex-col items-center w-full max-w-md sm:max-w-xl  rounded-xl  shadow-lg "
          >
            {/* Input Field */}
            <textarea
              type="text"
              placeholder="How can Devplex help you today?"
              value={newPrompt}
              rows={4}
              onChange={(e) => setNewPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#608dff] placeholder-gray-400 text-white bg-transparent resize-none text-sm sm:text-base"
              autoFocus
            />

            {/* Generate Button */}
            <div className="flex justify-between items-center mt-2 w-full">
              {/* Group Import and Figma buttons together */}
              <div className="flex gap-2">
                <h1 className="px-2 py-1 text-white cursor-pointer text-sm rounded-lg border flex items-center gap-2 border-white ">
                  <Link size={15} />
                  Import
                </h1>
                {/* <h1 className="px-2 py-1 text-white flex cursor-pointer text-sm items-center gap-2 rounded-lg border border-white ">
                  <FaFigma size={15} />
                  Figma
                </h1> */}
              </div>

              {/* Generate button */}
              <button
                onClick={() => {
                  enhanceProject(newPrompt, sessionId);
                }}
                className="px-4 py-2 text-sm  font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </motion.div>
        </div>
        {/* Code Editor */}
        <motion.div
          className="w-full relative max-w-[65%] h-[89vh]"
          initial={{ x: 100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-800/70 text-white">
              <div className="relative flex flex-col items-center bg-black border border-white/20 px-2 py-10 rounded-lg shadow-lg w-full max-w-xs text-center">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-24 h-24 rounded-full mb-2"
                >
                  <source src="/assets/codevideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <span className="text-sm tracking-wide ">Working On...</span>
              </div>
            </div>
          )}

          <CodeEditor sessionId={sessionId} refetch={refetch} />
        </motion.div>
      </div>
    </div>
  );
};

export default WorkspacePage;
