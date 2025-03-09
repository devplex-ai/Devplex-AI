import React from 'react'

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
      {/* Background Glow Effect */}
      <div
        className="absolute w-[2400px] h-[1000px] rounded-[50%] left-1/2 -translate-x-1/2 
      bg-[radial-gradient(closest-side,#000_85%,#249974)] top-[450px] border-[1px] border-[#8CD6DE]/30"
      ></div>

      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#A78AF7] via-[#64FFDA] to-[#A78AF7] text-transparent bg-clip-text"
      >
        Build Your Startup’s MVP in{" "}
        <span className="text-[#64FFDA]">1 Minute</span> with AI 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-4 text-lg md:text-xl max-w-3xl text-gray-300"
      >
        Devplex AI automates product development, letting founders and teams
        instantly generate high-quality MVPs.
        <span className="text-[#64FFDA]">
          {" "}
          Focus on growth, let AI handle the code.
        </span>
      </motion.p>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-6 flex flex-col items-center w-full max-w-lg bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg"
      >
        <input
          type="text"
          placeholder="Describe your idea... (e.g., AI-powered CRM)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64FFDA] placeholder-gray-600"
          autoFocus
        />
        <button className="mt-4 w-full px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#64FFDA] to-[#52D6B4] text-black rounded-lg shadow-lg hover:opacity-90 transition">
          Generate MVP 🚀
        </button>
      </motion.div>
    </div>
  );
}

export default Hero