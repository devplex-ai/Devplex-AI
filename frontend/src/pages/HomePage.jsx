import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaBrain, FaServer } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "../context/UserDetailContext";
import { useSelector } from "react-redux";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

const handleGenerate = () => {




  if (!user) {
 
    navigate("/login");
    return;
  }

  if (!prompt.trim()) {
    setError("Please describe your idea.");
    return;
  }

  if (prompt.length > 500) {
    setError("Idea description should be less than 500 characters.");
    return;
  }

  setError("");
  setLoading(true);

  // Simulate an API call
  setTimeout(() => {
    setLoading(false);
    setPrompt(""); // Clear input
    navigate("/workspace");
  }, 2000);
};

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
        {/* Background Glow Effect */}
        <div
          className="absolute w-[2600px] h-[800px] rounded-[50%] left-1/2 -translate-x-1/2 
 bg-[radial-gradient(closest-side,#000_70%,#1E90FF_90%,#00BFFF_100%)] blur-sm
 top-[450px] border-2 border-[#8CD6DE]/30 opacity-70"
        ></div>

        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-semibold leading-tight text-white"
        >
          What do you want to build?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-sm max-w-3xl text-gray-300"
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
          className="mt-6 flex flex-col items-center w-full max-w-xl bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-lg"
        >
          {/* Input Field */}
          <textarea
            type="text"
            placeholder="How can Devplex help you today?"
            value={prompt}
            rows={4}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#608dff] placeholder-gray-400 text-white bg-transparent resize-none"
            autoFocus
          />

          {/* Error and Success Messages */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm mt-2"
            >
              {success}
            </motion.p>
          )}

          {/* Generate Button */}
          <button
            onClick={() => {
              handleGenerate();
            }}
            disabled={loading}
            className="mt-4 w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </motion.div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-gray-300 z-20"
        >
          <h2 className="text-2xl font-semibold">Why Choose Devplex AI?</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/10 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <FaRocket className="text-3xl text-[#64FFDA]" />
              <h3 className="text-xl font-semibold mt-2">Fast Development</h3>
              <p className="mt-2 text-sm">
                Generate MVPs in minutes, not months.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/10 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <FaBrain className="text-3xl text-[#64FFDA]" />
              <h3 className="text-xl font-semibold mt-2">AI-Powered</h3>
              <p className="mt-2 text-sm">
                Leverage cutting-edge AI for high-quality code.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/10 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <FaServer className="text-3xl text-[#64FFDA]" />
              <h3 className="text-xl font-semibold mt-2">Scalable Solutions</h3>
              <p className="mt-2 text-sm">
                Build products that grow with your business.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
