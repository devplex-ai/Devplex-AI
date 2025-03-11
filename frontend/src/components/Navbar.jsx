// import React, { useState, useEffect, useRef } from "react";
// import { X, Menu } from "lucide-react";
// import { motion } from "framer-motion";
// import LoginPage from "../pages/LoginPage";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const [isLoginModal, setIsLoginModal] = useState(false);
//   const LoginModal = () => setIsLoginModal(true);


//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <nav className="w-full bg-black text-white py-4 px-40 flex items-center justify-between border border-white/10 rounded-lg relative">
//       {/* Logo + Name */}
//       <div className="flex items-center gap-3">
//         <img src="/logo-3.png" alt="Devplex AI Logo" className="h-8 w-auto" />
//         <span className="text-lg font-bold text-white">Devplex AI</span>
//       </div>

//       {/* Desktop Navigation */}
//       <ul className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
//         {["Home", "Services", "Docs", "About", "Pricing"].map((item, index) => (
//           <li
//             key={index}
//             className="hover:text-white transition cursor-pointer"
//           >
//             {item}
//           </li>
//         ))}
//       </ul>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={LoginModal}
//           className=" text-white bg-gray-900  px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer transition"
//         >
//           Sign in
//         </button>
//         <button className="bg-blue-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition">
//           Get Started
//         </button>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <motion.div
//           ref={menuRef}
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="absolute top-14 left-0 w-full bg-black border border-white/10 rounded-lg p-4 md:hidden"
//         >
//           <ul className="flex flex-col space-y-4 text-gray-300">
//             {["Home", "Services", "Docs", "About"].map((item, index) => (
//               <li
//                 key={index}
//                 className="hover:text-white transition cursor-pointer"
//                 onClick={() => setIsOpen(false)} // Close menu when clicking a link
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </motion.div>
//       )}
//     </nav>

//     {
//     LoginModal && (
//     <LoginPage/>
//     )}
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();


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
    <>
      <nav className="w-full bg-black text-white py-4 px-40 flex items-center justify-between border border-white/10 rounded-lg relative">
        {/* Logo + Name */}
        <div onClick={() =>{
          navigate("/");
        }} className="flex cursor-pointer items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Devplex AI Logo"
            className="h-8 w-auto"
          />
          <span className="text-lg font-bold text-white">Devplex AI</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-400 text-sm">
          {["Home", "Services", "Docs", "About", "Pricing"].map(
            (item, index) => (
              <li
                key={index}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            )
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-white bg-gray-900 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer transition"
          >
            Sign in
          </button>
          <button className="bg-blue-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition">
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            ref={menuRef}
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
          </div>
        )}
      </nav>

      {/* Login Modal */}
 
    </>
  );
};

export default Navbar;