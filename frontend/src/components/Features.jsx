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

function Feature() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-black via-gray-900 to-black px-4 py-12 md:py-20 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Supercharge Your Workflow with{" "}
            <span className="text-indigo-500">Devplex AI</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Devplex AI helps you design, develop, and deploy web apps at
            lightning speed using powerful AI-driven tools and automation.
          </p>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Reduce time-to-market by 90% with our expert workflows, smart
            templates, and 24/7 AI co-pilot built for modern developers and
            teams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-400" />,
                title: "90% Faster",
                subtitle: "Project Delivery",
                bgColor: "bg-indigo-900/40",
              },
              {
                icon: <DollarSign className="w-6 h-6 text-green-400" />,
                title: "50% Cheaper",
                subtitle: "Than Traditional Teams",
                bgColor: "bg-green-900/40",
              },
              {
                icon: <Clock className="w-6 h-6 text-yellow-400" />,
                title: "Instant Start",
                subtitle: "Zero Setup Time",
                bgColor: "bg-yellow-900/40",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={`${feature.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
                title: "AI-Powered Coding",
                subtitle: "Smarter, Cleaner Code",
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-400" />,
                title: "Enterprise Security",
                subtitle: "Built-In from Day One",
              },
              {
                icon: <HeadsetIcon className="w-6 h-6 text-red-400" />,
                title: "Dev Support",
                subtitle: "Available 24/7",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Launch Devplex Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              Explore Features
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
