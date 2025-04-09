import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    content:
      "I absolutely LOVE your product! It is the single best thing that I experienced since I found ChatGPT! The value that you create with this is just over the top mind-blowing as it basically replaces or enhances a ton of SaaS-Solutions in an instant.",
    author: "DeepJoy",
  },
  {
    content:
      "Devplex empowers me to create frontends that surpass my own technical limitations. It allows me to swiftly develop prototypes to showcase to clients, without the need for generic templates or starting from scratch. Essentially, it enables me to concentrate on the backend while GPT Engineer efficiently generates a functional and visually appealing frontend my clients will love.",
    author: "Nitin Kumar Singh",
  },
  {
    content:
      "Of all the products that I've tried, the services, the software your guys was the one that was legit & true to its word with no shady subscriptions and/or code stacks, which I really like. I totally understand you guys are an alpha, but it's light years ahead in my opinion and experience!",
    author: "Himanshu Raj.",
  },
  {
    content:
      "Devplex is hands down the best tool I've ever used. It's like a super senior dev who shares his tricks with you. For the first time, I can build apps without the headache. It's so much fun to use and gets me results in a heartbeat. Love it!",
    author: "Yash",
  },
  {
    content:
      "I tried Devplex yesterday, and it was amazing. I had to build a showcase for our own AI model. One prompt was enough to get a solid UI, and after a few iterations, it was connected to our API.",
    author: "Shreya Yadav",
  },
];

function Testimonials() {
  return (
    <div className="min-h-screen bg-black bg-[url('/assets/herobg.png')] bg-cover bg-center bg-no-repeat text-white py-8 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="text-center mb-4 md:mb-16">
          <h1 className="text-3xl md:text-5xl  font-bold mb-2 md:mb-4 bg-gray-600 bg-clip-text text-transparent">
            Developer Love's Devplex
          </h1>
          <p className="text-gray-500 text-lg">
            See what developers say about us
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-gray-700/50 transition-all duration-300 shadow-md hover:shadow-purple-500/20"
            >
              <blockquote>
                <p className="text-white text-sm md:text-base mb-4 leading-relaxed">
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
