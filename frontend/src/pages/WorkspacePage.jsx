import React from "react";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import AppSideBar from "../components/AppSideBar";
import Avatar from "boring-avatars";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ChevronDown, FolderGit2, FolderInput, Rocket, SquareChevronDown } from "lucide-react";

const WorkspacePage = () => {
   const { user } = useSelector((state) => state.auth); 
  return (
    <div className="w-full bg-black h-screen flex flex-col gap-2 overflow-hidden">
      <div className="w-full flex items-center justify-between px-4  h-14 border-b border-white/20">
        <div className="ml-18 px-2 flex  gap-4 py-2  rounded bg-white/20  ">
          <h1 className="text-white  flex items-center gap-2 text-sm">
            <FolderGit2 size={20} className="text-gray-300" />
            <span className="truncate max-w-[300px]">
              Create Todo Application
            </span>
          </h1>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
        <div className="flex  w-fit items-center gap-2 flex-wrap shrink-0">
          <div className="flex gap-1 items-center rounded bg-white/20 px-2 py-1">
            <img src="/assets/coin.png" alt="coin" className="h-6" />
            <h1 className="text-sm text-white ">500</h1>
          </div>
          <h2 className="text-sm flex gap-1 items-center text-gray-300 cursor-pointer bg-gray-900 hover:bg-gray-800 py-1 px-2 rounded">
            Export
            <FolderInput size={20} />
          </h2>
          <h2 className="text-sm flex gap-1 items-center text-white cursor-pointer bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded">
            Deploy
            <Rocket size={20} />
          </h2>
        </div>
      </div>
      <AppSideBar />
      <div className="flex gap-4 px-8">
        <div className="w-1/2 h-[90vh] flex flex-col justify-between gap-2 ml-14 border border-white/20 p-4 rounded">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-2 h-[70vh] overflow-y-scroll scrollbar-none"
          >
            <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
              <div className="w-10">
                <Avatar
                  size={40}
                  name={user?.name}
                  variant="beam"
                  colors={[
                    "#FF6B6B",
                    "#FFD93D",
                    "#6BCB77",
                    "#4D96FF",
                    "#FF6EC7",
                  ]}
                />
              </div>
              <h1 className="text-sm font-medium leading-loose break-words">
                Create Todo App
              </h1>
            </div>
            <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
              <h1 className="text-sm font-medium leading-loose break-words">
                Sure! Here’s how you can create a Todo App and enhance it with
                useful features: Start with a simple interface that lets users
                add, edit, and delete tasks easily. Then, make it smarter by
                adding due dates, reminders, and task prioritization so users
                can manage their day efficiently.
              </h1>
            </div>
            <div className="w-full bg-[#262626] text-white py-3 px-4 flex items-start gap-3 rounded-md">
              <div className="w-10">
                <Avatar
                  size={40}
                  name={user?.name}
                  variant="beam"
                  colors={[
                    "#FF6B6B",
                    "#FFD93D",
                    "#6BCB77",
                    "#4D96FF",
                    "#FF6EC7",
                  ]}
                />
              </div>
              <h1 className="text-sm font-medium leading-loose break-words">
                Add some new features which are helpful for
              </h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className=" flex flex-col items-center w-full max-w-xl "
          >
            {/* Input Field */}
            <textarea
              type="text"
              placeholder="How can Devplex help you today?"
              value={prompt}
              rows={6}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#608dff] placeholder-gray-400 text-white bg-transparent resize-none"
              autoFocus
            />
          </motion.div>
        </div>

        <motion.div
          className="w-full h-[85vh]"
          initial={{ x: 100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <CodeEditor />
        </motion.div>
      </div>
    </div>
  );
};

export default WorkspacePage;
