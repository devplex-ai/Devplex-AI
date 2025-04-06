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
  Globe
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

function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
{/* Hero Section */}
<motion.section 
  initial="hidden"
  animate="visible"
  variants={sectionVariants}
  className="pt-32 pb-24 relative overflow-hidden"
>
  {/* Animated background particles */}
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
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 2 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>

  {/* Radial gradient overlay */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 to-transparent" />

  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.div 
      className="relative inline-block"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-6xl md:text-7xl font-bold text-slate-100 mb-8 leading-tight mt-2"
        variants={{
          visible: { 
            transition: { 
              staggerChildren: 0.05,
              delayChildren: 0.2
            } 
          }
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
                className="inline-block hover:-translate-y-1 transition-transform"
                whileHover={{ scale: 1.1 }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="ml-4 inline-block w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </motion.span>
        ))}
        
        <motion.div 
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent relative">
          Software Development
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-500 animate-underline" />
          </span>
        </motion.div>
      </motion.h1>
    </motion.div>

    <motion.div 
      className="relative inline-block max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.p 
        className="text-xl text-slate-400 mb-12 font-mono relative"
        variants={{
          hidden: { width: 0 },
          visible: {
            width: "100%",
            transition: { duration: 2, ease: "circOut" }
          }
        }}
      >
       Empowering the future with AI-driven automation
        <span className="text-cyan-400 ml-2 border-b-2 border-cyan-400/30 animate-typewriter">
        transforming the way software is built, faster and smarter than ever. 🚀
        </span>
      </motion.p>
    </motion.div>

    <motion.div 
      className="relative z-10"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-teal-500/30 to-cyan-600/30 backdrop-blur-lg">
        <div className="bg-slate-900/80 rounded-xl p-4">
          <Process />
        </div>
      </div>
    </motion.div>
  </div>

  {/* Floating code brackets */}
  <motion.div 
    className="absolute top-1/4 left-10 opacity-20 text-8xl text-cyan-400/30"
    animate={{ y: [-40, 80, -30] }}
    transition={{ duration: 8, repeat: Infinity }}
  >
    {"</>"}
  </motion.div>
  <motion.div 
    className="absolute bottom-1/4 right-10 opacity-20 text-8xl text-teal-400/30"
    animate={{ y: [-40, 80, -30] }}
    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
  >
    {"{}"}
  </motion.div>
</motion.section>
    {/* Core Values */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-20 relative overflow-hidden"
>
  {/* Animated background gradient */}
  <motion.div
    className="absolute inset-0 -z-10 opacity-20"
    initial={{ backgroundPosition: '0% 50%' }}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror"
    }}
    style={{
      background: 'linear-gradient(-45deg, #0f172a, #1e293b, #0d9488, #0891b2)',
      backgroundSize: '400% 400%'
    }}
  />

  <div className="max-w-6xl mx-auto px-1">
    <motion.h2
      className="text-3xl font-bold text-slate-100 text-center mb-13"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
         Our Philosophy
      </span>
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-19 max-w-4xl mx-auto">
      {[
        {
          title: "Vision",
          description: "Creating a symbiotic relationship between human creativity and artificial intelligence to push the boundaries of software innovation."
        },
        {
          title: "Mission",
          description: "Democratizing access to enterprise-grade development tools through intelligent automation and machine learning."
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
        >
          <motion.div
            className="relative bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-lg cursor-pointer overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Hover gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity"
              style={{
                background: `linear-gradient(45deg, ${index % 2 ? '#0d9488' : '#0891b2'}, ${index % 2 ? '#1e293b' : '#0f172a'})`
              }}
            />

            <div className="p-20">
              <div className="flex justify-between items-center mb-9">
                <h3 className="text-xl font-bold text-slate-100">
                  {item.title}
                </h3>
                <motion.div
                  className="text-teal-1200"
                  whileHover={{ scale: 1.2 }}
                >
                 
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                <motion.p
                  className="text-slate-400 text-sm overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {item.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
              animate={{
                borderColor: ['#0d948800', '#0d9488ff', '#0d948800']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
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
        className="py-20 bg-slate-800/30"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Industry Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Rocket, value: "10x", label: "Faster Deployment" },
              { icon: Code, value: "98%", label: "Code Accuracy" },
              { icon: Users, value: "1k+", label: "Daily Active Teams" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-lg"
                custom={index}
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
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Why Choose Devplex AI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Leadership */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">
            Meet Our Founder
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Sultan Alam",
                role: "Co-Founder & CEO",
                description: "MERN Stack Developer 💻 dedicated to building innovative and user-friendly web applications 🌐 that solve real-world problems 🚀.",
                social: {
                  linkedin: "https://linkedin.com/in/sultan-alam436",
                  portfolio: "https://sultan-alam.netlify.app"
                }
              },
              {
                name: "Yash Tupkar",
                role: "Co-Founder & CTO",
                description: " MERN Stack Developer skilled in building scalable, user-friendly web apps. 💻 Experienced in React, Node.js, Express, and MongoDB, with a focus on performance and real-time features. ",
                social: {
                  linkedin: "https://linkedin.com/in/yash-tupkar",
                  portfolio: "https://yashtupkar.vercel.app"
                }
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-lg"
                custom={index}
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-teal-600/50 mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-400">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-teal-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-sm text-center mb-4">
                    {member.description}
                  </p>
                  <div className="flex gap-3">
                    {Object.entries(member.social).map(([key, value]) => (
                      <motion.a
                        key={key}
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-slate-400 hover:text-teal-400 transition-colors"
                      >
                        {key === 'linkedin' && <Linkedin className="w-5 h-5" />}
                        {key === 'portfolio' && <Globe className="w-5 h-5" />}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="py-20"
>
  <div className="max-w-3xl mx-auto px-4 text-center">
    <div className="bg-gradient-to-br from-teal-600/30 to-cyan-700/30 p-1 rounded-xl backdrop-blur-lg">
      <div className="bg-slate-900/80 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-slate-100 mb-6">
          Start Your AI-Powered Journey
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Start Free Trial
          </motion.a>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="hidden sm:inline">or</span>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.03 }}
              className="border border-slate-600 hover:border-teal-400/50 px-6 py-3 rounded-lg font-medium transition-colors"
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