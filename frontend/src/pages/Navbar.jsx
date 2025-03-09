import React, { useState, useEffect, useRef } from "react";
import { X, Menu } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="w-full bg-black text-white py-4 px-6 flex items-center justify-between border border-white/10 rounded-lg relative">
      
      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <img src="/logo-3.png" alt="Devplex AI Logo" className="h-8 w-auto" />
        <span className="text-lg font-bold text-white">Devplex AI</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
        {["Home", "Services", "Docs", "About"].map((item, index) => (
          <li key={index} className="hover:text-white transition cursor-pointer">
            {item}
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
          Get Started
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-14 left-0 w-full bg-black border border-white/10 rounded-lg p-4 md:hidden"
        >
          <ul className="flex flex-col space-y-4 text-gray-300">
            {["Home", "Services", "Docs", "About"].map((item, index) => (
              <li 
                key={index} 
                className="hover:text-white transition cursor-pointer"
                onClick={() => setIsOpen(false)} // Close menu when clicking a link
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
