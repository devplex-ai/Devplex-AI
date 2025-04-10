import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  DollarSign,
  Clock,
  Lightbulb,
  Shield,
  HeadsetIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


function Feature() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-black px-4 py-12 md:py-20 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent md:text-5xl font-bold mb-6">
            Supercharge Your Workflow with{" "}
            <span className="text-indigo-500">Devplex AI</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Devplex AI helps you design, develop, and deploy web apps at
            lightning speed using powerful AI-driven tools and automation.
          </p>
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Reduce time-to-market by 90% with our expert workflows, smart
            templates, and 24/7 AI co-pilot built for modern developers and
            teams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-400" />,
                title: "90% Faster",
                subtitle:
                  "Launch your product 90% faster with AI-driven workflows.",
                bgColor: "bg-indigo-900/40",
              },
              {
                icon: <DollarSign className="w-6 h-6 text-green-400" />,
                title: "50% Cheaper",
                subtitle: "Cut development costs by over half.",
                bgColor: "bg-green-900/40",
              },
              {
                icon: <Clock className="w-6 h-6 text-yellow-400" />,
                title: "Instant Start",
                subtitle: "Go from idea to build in minutes.",
                bgColor: "bg-yellow-900/40",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-900 border hover:bg-gray-800 border-gray-800 rounded-2xl  flex flex-col items-center p-6 shadow-lg"
              >
                <div
                  className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold  text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
                title: "AI-Powered Coding",
                subtitle:
                  "Code smarter, not harder, with intelligent AI agents.",
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-400" />,
                title: "Enterprise Security",
                subtitle: " Built-in protection that scales with you.",
              },
              {
                icon: <HeadsetIcon className="w-6 h-6 text-red-400" />,
                title: "Dev Support",
                subtitle: "assisted help when you need it most.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-900 border hover:bg-gray-800 border-gray-800 rounded-2xl flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    feature.icon.props.className?.includes("blue")
                      ? "bg-blue-900/40"
                      : feature.icon.props.className?.includes("purple")
                      ? "bg-purple-900/40"
                      : "bg-red-900/40"
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold  text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate("/");
              }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate("/pricing");
              }}
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              Upgrade
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 mt-8"
          >
            Free forever for solo devs • No credit card needed • Built to scale
            with you
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Feature;
