// import React from "react";
// import { MessageSquare, Share2, Sparkles, Type } from "lucide-react";

// function Process() {
//  const steps = [
//    {
//      number: 1,
//      icon: <Type className="w-6 h-6" />,
//      title: "Describe your idea in simple words",
//      description:
//        "Tell us what you want to build using natural language—no technical skills needed.",
//    },
//    {
//      number: 2,
//      icon: <Sparkles className="w-6 h-6" />,
//      title: "AI generates your first version instantly",
//      description:
//        "See your idea take shape as our AI builds a working prototype in seconds.",
//    },
//    {
//      number: 3,
//      icon: <MessageSquare className="w-6 h-6" />,
//      title: "Refine and customize with AI assistance",
//      description:
//        "Interact with the editor to tweak designs, add features, and perfect your project.",
//    },
//    {
//      number: 4,
//      icon: <Share2 className="w-6 h-6" />,
//      title: "Launch and share with the world",
//      description:
//        "Deploy your project instantly and collaborate with others effortlessly.",
//    },
//  ];


//     return (
//       <div className=" bg-transparent pt-2 px-4 md:px-20">
//         <div className="max-w-7xl mx-auto mt-4">
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
//             {steps.map((step, index) => (
//               <div
//                 key={step.number}
//                 className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white/10 rounded-lg shadow-lg "
//               >
//                 <div className="absolute -top-6 border-white/10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center shadow-xl ring-1 ring-white/10">
//                   <span className="text-xl font-semibold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
//                     {step.number}
//                   </span>
//                   {index < steps.length - 1 && (
//                     <div className="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[1px] bg-zinc-800" />
//                   )}{" "}
//                 </div>

//                 <div className="space-y-4 flex flex-col mt-4 items-center">
               
//                   <h3 className="text-xl font-medium leading-tight">
//                     {step.title}
//                   </h3>
//                   <p className="text-zinc-400 text-sm">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
// }

// export default Process;
import React from "react";
import { motion } from "framer-motion";
import { MessageSquareCode, Palette, Zap, Send } from "lucide-react";

const steps = [
  {
    title: "Describe your idea in simple words",
    description:
      "Tell us what you want to build using natural language—no technical skills needed.",
    icon: Palette,
    color: "bg-blue-100 text-blue-600",
    image:
      "/assets/idea1.png",
  },
  {
    title: "AI generates your first version instantly",
    description:
      "See your idea take shape as our AI builds a working prototype in seconds.",
    icon: Zap,
    color: "bg-purple-100 text-purple-600",
    image:
      "/assets/aiDev1.png",
  },
  {
    title: "Refine and customize with AI assistance",
    description:
      "Interact with the editor to tweak designs, add features, and perfect your project.",
    icon: MessageSquareCode,
    color: "bg-green-100 text-green-600",
    image:
      "/assets/update1.png",
  },
  {
    title: "Launch and share with the world",
    description:
      "Deploy your project instantly and collaborate with others effortlessly.",
    icon: Send,
    color: "bg-orange-100 text-orange-600",
    image:
      "/assets/deploy1.png",
  },
];

function Process() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className=" text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          How Devplex Works
        </h2>
        <p className="text-gray-400 mb-4 md:mb-16 text-sm md:text-base text-center ">
          Devplex crafts your product from concept to code in four bold steps.
        </p>

        <div className="space-y-24">
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
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                } gap-12`}
              >
                {/* Text Content */}
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
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image Content */}
                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-72 object-contain bg-white"
                    />
                  </div>
                </motion.div>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-16 h-16 w-px bg-gray-700" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Process;
