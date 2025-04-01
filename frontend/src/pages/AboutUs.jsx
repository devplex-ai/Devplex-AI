import React, { useState } from "react";
import {
  Code2,
  Rocket,
  Scale,
  Zap,
  Brain,
  Users,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Process from "../components/Process";

function FeatureCard({ icon: Icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 transform 
        ${isHovered ? "scale-105 shadow-indigo-500/25" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div
          className={`p-2 rounded-lg transition-colors duration-300 ${
            isHovered ? "bg-indigo-600" : "bg-gray-700"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isHovered ? "text-white" : "text-indigo-400"
            }`}
          />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function VisionMissionCard({ title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-[#12141F] p-8 rounded-xl shadow-lg cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <ChevronDown
          className={`w-6 h-6 text-indigo-400 transition-transform duration-300 
            ${isExpanded ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      <p
        className={`text-gray-300 transition-all duration-300 overflow-hidden
        ${isExpanded ? "max-h-96 opacity-100" : "max-h-20 opacity-80"}`}
      >
        {description}
      </p>
    </div>
  );
}

function AboutUs() {
  const [activeSection, setActiveSection] = useState(null);

  const handleScroll = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
          {/* Navigation */}

          {/* Hero Section */}
          <div id="hero" className="relative overflow-hidden pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Redefining Software Development
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Founded by ambitious university graduates with a bold vision,
                  we're empowering creators, developers, and innovators
                  worldwide with cutting-edge AI-powered tools.
                </p>
              </div>
                    </div>
                    <Process/>
          </div>

          {/* Vision & Mission */}
          <div
            id="vision"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <VisionMissionCard
                title="Our Vision"
                description="To build a future where software creation is accessible, effortless, and driven by innovation, regardless of technical expertise. We envision a world where the barriers between imagination and implementation dissolve, enabling anyone with an idea to bring it to life."
              />
              <VisionMissionCard
                title="Our Mission"
                description="To simplify software development through intelligent automation, enabling creators to focus on their vision while we handle the heavy lifting. We're committed to democratizing software development by providing AI-powered tools that make coding as natural as conversation."
              />
            </div>
          </div>

          {/* Why Choose Us */}
          <div
            id="features"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose Devplex AI?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              <FeatureCard
                icon={Zap}
                title="Speed"
                description="Launch products within hours, not weeks."
              />
              <FeatureCard
                icon={Scale}
                title="Scalability"
                description="Seamlessly grow from MVPs to enterprise-grade solutions."
              />
              <FeatureCard
                icon={Brain}
                title="Intelligence"
                description="AI agents that continuously optimize your applications for performance, security, and efficiency."
              />
              <FeatureCard
                icon={Users}
                title="Accessibility"
                description="A platform designed for developers, founders, product designers, and innovators alike."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <p className="text-xl font-semibold text-white">
                  Join us as we transform the future of software development
                </p>
                <div className="mt-8">
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default AboutUs;
