import React from "react";
import { Star } from "lucide-react";

function HeroBottom() {
  return (
    <div className="h-fit bg-transparent pb-36 flex items-center justify-center p-4">
      <div className="text-white flex flex-col items-center max-w-xl">
        <h2 className="text-xl text-gray-300 font-semibold mb-4">
          100+ founders are building with Devplex
        </h2>

        <div className="flex items-center gap-4">
          {/* Profile Images Stack */}
          <div className="flex -space-x-3">
            {[
              "/assets/img1.jpg",
              "/assets/img2.jpg",
              "/assets/img3.jpg",
              "/assets/img4.jpg",
              "/assets/img5.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full border-2 border-black overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Founder ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBottom;
