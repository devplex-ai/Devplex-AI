import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut, User } from "lucide-react";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function DropdownMenu({ username }) {
  const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-900 bg-gray-800 transition-colors "
      >
        <span className="text-gray-200 text-sm">{username}</span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-50 border border-gray-700">
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
            <User className="h-4 w-4 mr-3 text-gray-400" />
            Profile
            <span className="ml-auto text-xs text-gray-500">Ctrl+P</span>
          </button>
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
            <Settings className="h-4 w-4 mr-3 text-gray-400" />
            Settings
            <span className="ml-auto text-xs text-gray-500">Ctrl,</span>
          </button>
          <hr className="my-1 border-gray-700" />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4 mr-3 text-red-400" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
