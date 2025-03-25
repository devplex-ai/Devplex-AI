import React, { useState, useEffect, useRef } from "react";
import { X, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import Avatar from "boring-avatars";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");

  dispatch(logout());

  toast.success("Sign Out Successfully");

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};



  return (
    <>
      <nav className="w-full bg-black text-white py-4 px-40 flex items-center justify-between border border-white/10 rounded-lg relative">
        {/* Logo + Name */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex cursor-pointer items-center gap-3"
        >
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
          {user ?(
            <>
              <Avatar
                size={40}
                  src={user.avatar}
                name={user?.name}
                variant="beam"
                  colors={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6EC7"]}
                  className=""
              />
              <button
                onClick={() => {
                  handleLogout();
            }}
                className="text-white flex gap-2 bg-gray-900 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer transition"
              >
                Sign Out <LogOut size={20}/>
              </button>
            </>
          ): (
            <>
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
            </>
          )}

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