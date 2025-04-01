import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaBrain, FaServer, FaFigma } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "../context/UserDetailContext";
import { useSelector } from "react-redux";
import FAQ from "../components/FaqSection";
import PricingPage from "./PricingPage";
import Pricing from "../components/Pricing";
import axios from "axios";
import AppSideBar from "../components/AppSideBar";
import { v4 as uuidv4 } from "uuid";
import { AlertCircle, ArrowRight, CheckCircle, Figma, Link, X } from "lucide-react";
import Process from "../components/Process";
import Footer from "../components/Footer";
const Home = () => {

 const apiURL = import.meta.env.VITE_BASE_URL;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0); // Track API progress
  const [status, setStatus] = useState("idel"); 
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

// const handleGenerate = async () => {
//   if (!user) {
//     navigate("/login");
//     return;
//   }

//   if (!prompt.trim()) {
//     setError("Please describe your idea.");
//     return;
//   }

//     setTimeout(() => {
//       setIsModalOpen(true);
//     }, 2000);

  

//   setError("");
//   setLoading(true);

//   try {
//     const response = await axios.post(`${apiURL}/api/start-chat`, {
//       userId: user._id,
//       prompt,
//     });

//     if (response.data.sessionId) {
//       setPrompt(""); 
//       setTimeout(() => {
//         setIsModalOpen(false); // Close modal after API call
//         navigate(`/workspace/${response.data.sessionId}`);
//       }, 500);
//     } else {
//       setError("Failed to start session. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error starting chat:", error);
//     setError("Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };
const handleGenerate = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (!prompt.trim()) {
    setError("Please describe your idea.");
    return;
  }

  setError("");
  setLoading(true);
  setProgress(0); // Reset progress
  setStatus("loading");
  setIsModalOpen(true); // Open modal immediately

  try {
    const response = await axios.post(
      `${apiURL}/api/start-chat`,
      { userId: user._id, prompt },
      {
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      }
    );

    if (response.data.sessionId) {
      setStatus("success");
      setProgress(100);
      setPrompt("");

      setTimeout(() => {
        setIsModalOpen(false); // Close modal after success animation
        navigate(`/workspace/${response.data.sessionId}`);
      }, 1000);
    } else {
      throw new Error("Failed to start session.");
    }
  } catch (error) {
    console.error("Error starting chat:", error);
    setStatus("error");
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-black h-full min-h-screen">
      <AppSideBar />
      <Navbar />
      <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-black text-white">
        {/* Background Glow Effect - Adjusted for mobile */}
        <div
          className="absolute w-[2600px] h-[800px] rounded-[50%] left-1/2 -translate-x-1/2 
 bg-[radial-gradient(closest-side,#000_70%,#1E90FF_90%,#00BFFF_100%)] blur-sm
 top-[450px] border-2 border-[#8CD6DE]/30 opacity-70"
        ></div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          What do you want to build?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-xs sm:text-sm max-w-3xl text-gray-300 px-2"
        >
          Devplex AI – Build Faster, Grow Smarter.
          <span className="text-[#00BFFF]">
            {" "}
            Focus on growth, let AI handle the code.
          </span>
        </motion.p>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 flex flex-col items-center w-full max-w-md sm:max-w-xl bg-white/10 backdrop-blur-lg p-2 sm:p-6 rounded-xl border border-white/20 shadow-lg mx-2"
        >
          {/* Input Field */}
          <textarea
            type="text"
            placeholder="How can Devplex help you today?"
            value={prompt}
            rows={4}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#608dff] placeholder-gray-400 text-white bg-transparent resize-none text-sm sm:text-base"
            autoFocus
          />

          {/* Error and Success Messages */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs sm:text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-xs sm:text-sm mt-2"
            >
              {success}
            </motion.p>
          )}

          {/* Generate Button */}
          <div className="flex justify-between items-center mt-2 w-full">
            {/* Group Import and Figma buttons together */}
            <div className="flex gap-2">
              <h1 className="px-4 py-2 cursor-pointer rounded-xl border flex items-center gap-2 border-white/10 ">
                <Link size={20} />
                Import
              </h1>
              <h1 className="px-4 py-2 flex cursor-pointer text-sm items-center gap-2 rounded-xl border border-white/10 ">
                <FaFigma size={20} />
                Figma
              </h1>
            </div>

            {/* Generate button */}
            <button
              onClick={() => {
                handleGenerate();
              }}
              disabled={loading}
              className="px-4 py-2 text-sm sm:px-6 sm:py-3 font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Generating..."
              ) : (
                <div className="flex items-center gap-2">
                  Generate <ArrowRight />
                </div>
              )}
            </button>
          </div>
        </motion.div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 sm:mt-12  text-gray-300 z-20 w-full px-2"
        >
          <Process />
        </motion.div>
      </div>
      <Pricing />
      <FAQ />
      <Footer/>
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          progress={progress}
          status={status}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const messages = [
  "Adding files...",
  "Creating files...",
  "Setting up the environment...",
  "Installing dependencies...",
  "Starting the server...",
  "Generating components...",
  "Optimizing performance...",
  "Finalizing setup...",
  "Configuring database...",
  "Deploying assets...",
  "Compiling source code...",
  "Testing API endpoints...",
  "Building UI elements...",
  "Deploying application...",
  "Cleaning up temporary files...",
  "Initializing final checks...",
  "Launching project...",
];

// const VideoModal = () => {
  

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex justify-center items-center">
//         <div className="flex flex-col items-center gap-3 bg-black p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
//           <h2 className="text-xl font-semibold mb-3 text-white animate-pulse">
//             {currentMessage}
//           </h2>

//           <video autoPlay loop muted className="w-40 rounded-full">
//             <source src="/assets/codevideo.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>

//           <p className="mt-2 text-white">
//             Please wait while we process your request.
//           </p>
//         </div>
//       </div>
//       <div className="fixed inset-0 z-40 bg-gray-900 opacity-50"></div>
//     </>
//   );
// };
const VideoModal = ({ isOpen,progress, status, onClose }) => {

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[newIndex]);
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <>
 
      <div className="fixed inset-0 z-40 bg-gray-900 opacity-50"></div>

      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative flex flex-col items-center gap-3 bg-black border border-white/20 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
   
          {status !== "loading" && (
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-white hover:text-gray-400"
            >
              <X size={24} />
            </button>
          )}

          {/* Dynamic Message */}
          <h2 className="text-xl font-semibold mb-3 text-white animate-pulse">
            {status === "loading"
              ? "Processing your request..."
              : status === "success"
              ? "Success!"
              : "Error occurred!"}
          </h2>

          {/* Loading Video / Success Animation */}
          {status === "loading" ? (
            <video
              autoPlay
              loop
              muted
              className="w-40 rounded-full border-4 border-white/20"
            >
              <source src="/assets/codevideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : status === "success" ? (
            <CheckCircle size={64} className="text-green-400 animate-bounce" />
          ) : (
            <AlertCircle size={64} className="text-red-400 animate-shake" />
          )}

          <h2 className="text-lg font-semibold mb-3 text-gray-400 ">
            {currentMessage}
          </h2>

       
          <p className="text-white text-sm">
            {status === "loading"
              ? `Developing...`
              : status === "success"
              ? "Your project is ready!"
              : "Something went wrong. Try again."}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
