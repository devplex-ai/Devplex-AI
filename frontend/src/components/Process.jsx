import React from "react";
import { MessageSquare, Share2, Sparkles, Type } from "lucide-react";

function Process() {
 const steps = [
   {
     number: 1,
     icon: <Type className="w-6 h-6" />,
     title: "Describe your idea in simple words",
     description:
       "Tell us what you want to build using natural language—no technical skills needed.",
   },
   {
     number: 2,
     icon: <Sparkles className="w-6 h-6" />,
     title: "AI generates your first version instantly",
     description:
       "See your idea take shape as our AI builds a working prototype in seconds.",
   },
   {
     number: 3,
     icon: <MessageSquare className="w-6 h-6" />,
     title: "Refine and customize with AI assistance",
     description:
       "Interact with the editor to tweak designs, add features, and perfect your project.",
   },
   {
     number: 4,
     icon: <Share2 className="w-6 h-6" />,
     title: "Launch and share with the world",
     description:
       "Deploy your project instantly and collaborate with others effortlessly.",
   },
 ];


    return (
      <div className=" bg-transparent pt-2 px-4 md:px-20">
        <div className="max-w-7xl mx-auto mt-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white/10 rounded-lg shadow-lg "
              >
                <div className="absolute -top-6 border-white/10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center shadow-xl ring-1 ring-white/10">
                  <span className="text-xl font-semibold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[1px] bg-zinc-800" />
                  )}{" "}
                </div>

                <div className="space-y-4 flex flex-col mt-4 items-center">
               
                  <h3 className="text-xl font-medium leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Process;
