import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Devplex AI?",
    answer:
      "Devplex AI is an AI-powered SaaS factory that helps founders and developers build fully functional software products in hours, without needing a technical team.",
  },
  {
    question: "How does Devplex AI work?",
    answer:
      "Users describe their idea in natural language, and our AI agents handle the coding, UI/UX design, debugging, API integrations, and deployment automatically.",
  },
  {
    question: "Who can use Devplex AI?",
    answer:
      "Non-technical founders who want to build products without hiring developers. Developers looking to speed up coding and automate repetitive tasks. Startups, indie hackers, and businesses that need rapid software development.",
  },
  {
    question: "What kind of applications can I build with Devplex AI?",
    answer:
      "You can build web apps, SaaS products, APIs, automation tools, dashboards, and more. The platform is optimized for startup-friendly, scalable applications.",
  },
  {
    question: "Do I need coding knowledge to use Devplex AI?",
    answer:
      "No! The platform is designed for both technical and non-technical users. Developers can refine the AI-generated code, while non-tech users can launch without writing a single line of code.",
  },
  {
    question: "How much does Devplex AI cost?",
    answer:
      "We offer a tiered pricing model with Free, Starter, Business, and Enterprise plans. Each plan provides different levels of AI usage, automation, and support.",
  },
 ];


function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="bg-black">
      <button
        className="w-full flex items-center justify-between p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl text-left border border-gray-800/50 shadow-lg"
        onClick={onClick}
      >
        <span className="text-xl text-gray-100 font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-blue-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-blue-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 mt-2 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      className="min-h-screen bg-black p-6 md:p-12"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(29, 78, 216, 0.15), rgba(30, 41, 59, 0.15)), url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1  className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Blok
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
