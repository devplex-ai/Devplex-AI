
import React from "react";
import { motion } from "framer-motion";
import Avatar from "react-avatar";

const testimonials = [
  {
    content:
      "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    author: "Samantha Johnson",
    avatar: "/assets/avatar6.png",
  },
  {
    content:
      "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    author: "Isabella Rodriguez",
    avatar: "/assets/avatar5.png",
  },
  {
    content:
      "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    author: "Gabrielle Williams",
    avatar: "/assets/avatar4.png",
  },
  {
    content:
      "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    author: "Victoria Thompson",
    avatar: "/assets/avatar3.png",
  },
  {
    content:
      "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    author: "John Peter",
    avatar: "/assets/avatar2.png",
  },
  {
    content:
      "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    author: "Natalie Martinez",
    avatar: "/assets/avatar1.png",
  },
];

// Repeat the array to allow infinite loop illusion
const repeatedTestimonials = [...testimonials, ...testimonials];

function Testimonials() {
  return (
    <div className="h-fit md:min-h-screen bg-black bg-[url('/assets/herobg.png')] bg-cover bg-center bg-no-repeat text-white py-12 md:py-20 px-0 sm:px-6 lg:px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl  font-bold mb-2 md:mb-4 bg-gray-600 bg-clip-text text-transparent">
            Developer Love's Devplex{" "}
          </h1>{" "}
          <p className="text-gray-500 text-lg">
            See what developers say about us{" "}
          </p>
        </div>

        {/* Smooth infinite sliding container */}
        <motion.div className="overflow-hidden w-full mt-4 relative">
          <motion.div
            className="flex"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[80%] sm:min-w-[50%] md:min-w-[33.3333%] px-2 md:px-4"
              >
                <div className="h-full bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-lg flex flex-col justify-center">
                  <blockquote>
                    <p className="text-white text-sm sm:text-lg md:text-xl mb-2 md:mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-[35px] h-[35px] rounded-full object-cover"
                      />
                      <footer className="text-gray-300 font-medium text-sm md:text-lg">
                        {testimonial.author}
                      </footer>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="overflow-hidden w-full mt-4 relative">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {repeatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[80%] sm:min-w-[50%] md:min-w-[33.3333%] px-2 md:px-4"
              >
                <div className="h-full bg-gradient-to-br from-gray-800/60 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-lg flex flex-col justify-center">
                  <blockquote>
                    <p className="text-white text-sm sm:text-lg md:text-xl mb-2 md:mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex gap-2 items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-[35px] h-[35px] rounded-full object-cover"
                      />
                      <footer className="text-gray-300 font-medium text-sm md:text-lg">
                        {testimonial.author}
                      </footer>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;
