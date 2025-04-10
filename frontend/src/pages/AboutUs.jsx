import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Code,
  Users,
  Zap,
  Scale,
  Brain,
  ChevronDown,
  Linkedin,
  Globe,
  Telescope,
  Crosshair
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Process from "../components/Process";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const cardHover = {
  hover: {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-lg"
      variants={sectionVariants}
      whileHover={cardHover}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600">
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function VisionMissionCard({ title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-lg cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-100">{title}</h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-teal-400" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        <motion.p
          className="text-slate-400 text-sm overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isExpanded ? "auto" : "72px" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {description}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

const steps = [
  {
    title: "Vision",
    description:
      "To build a future where software creation is accessible, effortless, and driven by innovation, regardless of technical expertise.",
    icon:Telescope,
    color: "bg-blue-100 text-blue-600",
    image:
      "/assets/vision.png",
  },
  {
    title: "Mission",
    description:
      "To simplify software development through intelligent automation, enabling creators to focus on their vision while we handle the heavy lifting.",
    icon:Crosshair, 
    color: "bg-purple-100 text-purple-600",
    image:
      "/assets/mission.png",
  },]

function AboutUs() {
  return (
    <div className="min-h-screen bg-black">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-32 pb-8 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-8 leading-tight mt-2"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {[" Revolutionizing "].map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {word.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-base sm:text-xl md:text-3xl hover:-translate-y-1 transition-transform"
                      whileHover={{ scale: 1.1 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <span className="ml-1 md:ml-4 inline-block w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse" />
                </motion.span>
              ))}

              <motion.div
                className="mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent relative">
                  Software Development
                </span>
              </motion.div>
            </motion.h1>
          </motion.div>

          <motion.div
            className="relative inline-block max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p
              className="text-lg sm:text-xl text-slate-400 mb-12 font-mono relative max-w-prose mx-auto"
            
            >
              Empowering the future with AI-driven automation
              <span className="text-cyan-400 ml-2 border-b-2 border-cyan-400/30 animate-typewriter">
                transforming the way software is built, faster and smarter than
                ever. 
              </span>
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="relative z-10 w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-teal-500/30 to-cyan-600/30 backdrop-blur-lg">
              <div className="bg-gray-950 rounded-xl p-4 sm:p-6 lg:p-8 text-left">
                <p className="text-white text-base sm:text-lg lg:text-xl">
                  At Devplex AI, we are redefining how software is built,
                  deployed, and scaled. Founded by a team of ambitious
                  university graduates with a bold vision, we’re on a mission to
                  empower creators, developers, and innovators worldwide with
                  cutting-edge AI-powered tools.
                </p>
                <p className="text-white text-base sm:text-lg lg:text-xl mt-4">
                  Our platform leverages advanced AI agents to automate coding,
                  UI design, DevOps, testing, security, and
                  optimization—allowing individuals and businesses to turn ideas
                  into fully functional products at lightning speed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-slate-100 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Our Philosophy
            </span>
          </motion.h2>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text */}
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center shadow-lg`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white ml-4">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Image */}
                  <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 sm:h-72 md:h-80 object-contain"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Metrics */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="py-20 bg-slate-800/30 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Industry Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Rocket, value: "10x", label: "Faster Deployment" },
              { icon: Code, value: "98%", label: "Code Accuracy" },
              { icon: Users, value: "1k+", label: "Daily Active Teams" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-lg"
              >
                <item.icon className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-slate-100 mb-2">
                  {item.value}
                </div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Why Choose Devplex AI?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Zap}
              title="Speed"
              description="Launch products within hours through our AI-accelerated platform"
            />
            <FeatureCard
              icon={Scale}
              title="Scalability"
              description="Seamlessly grow from MVP to enterprise solutions"
            />
            <FeatureCard
              icon={Brain}
              title="Intelligence"
              description="Continuous AI optimization for performance and security"
            />
            <FeatureCard
              icon={Users}
              title="Accessibility"
              description="Platform designed for technical and non-technical users"
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-teal-600/30 to-cyan-700/30 p-1 rounded-xl backdrop-blur-lg">
            <div className="bg-slate-900/80 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-100 mb-6">
                Start Your AI-Powered Journey
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto text-center"
                >
                  Start Free Trial
                </motion.a>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <span className="hidden sm:inline">or</span>
                  <motion.a
                    href="/login"
                    whileHover={{ scale: 1.03 }}
                    className="border border-slate-600 hover:border-teal-400/50 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto text-center"
                  >
                    Existing Account? Sign In
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default AboutUs;