import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    content:
      "I absolutely LOVE your product! It is the single best thing that I experienced since I found ChatGPT! The value that you create with this is just over the top mind-blowing as it basically replaces or enhances a ton of SaaS-Solutions in an instant.",
    author: "Thomas",
  },
  {
    content:
      "Lovable empowers me to create frontends that surpass my own technical limitations. It allows me to swiftly develop prototypes to showcase to clients, without the need for generic templates or starting from scratch. Essentially, it enables me to concentrate on the backend while GPT Engineer efficiently generates a functional and visually appealing frontend my clients will love.",
    author: "Marius - Veloxforce",
  },
  {
    content:
      "Of all the products that I've tried, the services, the software your guys was the one that was legit & true to its word with no shady subscriptions and/or code stacks, which I really like. I totally understand you guys are an alpha, but it's light years ahead in my opinion and experience!",
    author: "Patrick S.",
  },
  {
    content:
      "Lovable is hands down the best tool I've ever used. It's like a super senior dev who shares his tricks with you. For the first time, I can build apps without the headache. It's so much fun to use and gets me results in a heartbeat. Love it!",
    author: "Karin",
  },
  {
    content:
      "I tried Lovable yesterday, and it was amazing. I had to build a showcase for our own AI model. One prompt was enough to get a solid UI, and after a few iterations, it was connected to our API.",
    author: "Daniel",
  },
  {
    content:
      "I tried Lovable yesterday, and it was amazing. I had to build a showcase for our own AI model. One prompt was enough to get a solid UI, and after a few iterations, it was connected to our API.",
    author: "Daniel",
  },
];

function Testimonials() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Developer Love's Devplex
          </h1>
          <p className="text-gray-400 text-lg">
            See what developers say about us
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 shadow-md hover:shadow-purple-500/20"
            >
              <blockquote>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <footer className="text-gray-400 font-medium text-right">
                  — {testimonial.author}
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
