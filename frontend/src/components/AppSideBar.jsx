
import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";
import {
  PanelLeftOpen,
  MessageSquarePlus,
  Settings,
  HelpCircle,
  CreditCard,
  LogOut,
  Gift,
  MessageSquare,
} from "lucide-react";

const AppSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [chatHistory, setChatHistory] = useState([]);

 const apiURL = import.meta.env.VITE_BASE_URL;

useEffect(() => {
  if (user?.chats && user.chats.length > 0) {
    console.log("User chats before fetching:", user.chats); 
    const fetchAllChats = async () => {
      try {
        const chatData = await Promise.all(
          user.chats.map(async (chatId) => {
            const response = await fetch(`${apiURL}/api/chatHistory/${chatId}`);
            if (!response.ok) throw new Error(`Error fetching chat ${chatId}`);

            const data = await response.json();
            console.log(`Chat ID: ${chatId}, API Response:`, data); 

            return {
              _id: chatId,
              messages: data.messages,
              sessionId: data.sessionId || "Session ID Missing",
            };
          })
        );

        console.log("Final fetched chats:", chatData); // ✅ Check if all 17 chats are fetched
        setChatHistory(chatData);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchAllChats();
  }
}, [user]);



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

  const bottomActions = [
    { icon: Gift, label: "Get free tokens", className: "text-green-400" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help Center" },
    { icon: CreditCard, label: "My Subscription", link: "/pricing" },
    { icon: LogOut, label: "Sign Out" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-16 group z-20">
      <div className="w-16 h-full flex flex-col items-center justify-between bg-black bg-opacity-25 border border-gray-800 overflow-hidden">
        <img
          src="/assets/logo.png"
          alt="Devplex AI Logo"
          className="h-10 w-auto mt-2"
        />
        <div className="flex flex-col gap-4 items-center text-gray-400 mb-6">
          <Avatar
            src={user?.avatar}
            alt="User Avatar"
            name={user.name}
            size={40}
            className="h-10 w-10 rounded-full"
          />
          <PanelLeftOpen />
        </div>
      </div>

      <div className="fixed top-0 left-0 h-screen w-fit bg-gray-800 rounded-tr-3xl rounded-br-3xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-30">
        <div className="w-82 h-screen bg-black border-r-2 border-gray-400 rounded-tr-3xl rounded-br-3xl flex flex-col">
          <div
            onClick={() => navigate("/")}
            className="flex p-4 cursor-pointer items-center gap-2"
          >
            <img
              src="/assets/logo.png"
              alt="Devplex AI Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-semibold text-white">Devplex AI</span>
          </div>

          <div className="p-4">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-2 bg-gray-800 text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MessageSquarePlus size={20} />
              <span>Start new chat</span>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              <div className="px-4">
                <h2 className="text-gray-400 text-sm font-medium">
                  Chat History
                </h2>
              </div>
              {chatHistory.length > 0 ? (
                chatHistory.map((chat) => (
                  <button
                    key={chat._id}
                    onClick={() => {
                      console.log(`${chat.sessionId}`);
                      navigate(`/workspace/${chat.sessionId}`);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg bg-gray-900 px-2 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                  >
                    <MessageSquare size={18} />
                    <span className="truncate max-w-[200px]">
                      {chat.messages.length > 0
                        ? chat.messages.find((msg) => msg.role === "user")
                            ?.content || "Chat"
                        : "Chat"}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-gray-400 px-4">No chats found</p>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-800 pt-4 pb-4">
            {bottomActions.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.link) navigate(item.link);
                  if (item.label === "Sign Out") handleLogout();
                }}
                className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors ${
                  item.className || ""
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.avatar}
                name={user.name}
                alt="User Avatar"
                size={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="text-gray-200">{user?.email}</div>
                <div className="text-gray-400 text-sm">Personal Plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSideBar;

