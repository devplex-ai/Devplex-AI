// import React from 'react'

// const AppSideBar = () => {
//   return (
//     <div className="group">
//       <div className="fixed w-16 h-screen top-0 left-0 bg-gray-900 bg-opacity-25 border border-gray-800    overflow-hidden"></div>
//       <div className="w-1/4 fixed top-0 left-0 rounded-tr-3xl rounded-br-3xl transition-all duration-300 ease-in-out"></div>
//     </div>
//   );
// }

// export default AppSideBar


// import React, { useState } from "react";
// import Avatar from "react-avatar";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   PanelLeftOpen,
//   Search,
//   MessageSquarePlus,
//   Settings,
//   HelpCircle,
//   CreditCard,
//   Users,
//   LogOut,
//   Gift,
//   MessageSquare,
// } from "lucide-react";
// import { logout, setUser } from "../../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { fetchUserData } from "../../redux/authActions";

// const AppSideBar = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth); 
//   const [userAvatar, setUserAvatar] = useState(user?.avatar);
//   const [chatHistory, setChatHistory] = useState();

//   setChatHistory(user);
//   console.log(chatHistory);

//   const SAMPLE_CHATS = [
//     { id: "1", title: "Create Todo Application", date: "Yesterday" },
//     { id: "2", title: "Create Expense Tracker App", date: "Sunday" },
//   ]
 

// const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("user");

//   dispatch(logout());

//   toast.success("Sign Out Successfully");

//   setTimeout(() => {
//     window.location.href = "/";
//   }, 1000);
// };
//  const bottomActions = [
//    {
//      icon: Gift,
//      label: "Get free tokens",
//      className: "text-green-400",
    
//    },
//    {
//      icon: Settings,
//      label: "Settings",
    
//    },
//    {
//      icon: HelpCircle,
//      label: "Help Center",

//    },
//    {
//      icon: CreditCard,
//      label: "My Subscription",
//      link:"/pricing"

//    },
//    {
//      icon: LogOut,
//     // Ensure handleLogout is defined somewhere
//      label: "Sign Out",
//    },
//  ];

//   return (
//     <div className="fixed top-0 left-0 h-screen w-16 group  z-20">
//       {/* Small Sidebar */}
//       <div className="w-16 h-full flex flex-col items-center justify-between bg-black bg-opacity-25 border border-gray-800 overflow-hidden">
//         <img
//           src="/assets/logo.png"
//           alt="Devplex AI Logo"
//           className="h-10 w-auto mt-2"
//         />
//         <div className="flex flex-col gap-4 items-center text-gray-400 mb-6">
//           <Avatar
//             src={`${userAvatar}`}
//             alt="User Avatar"
//             size={40}
//             className="h-10 w-10 rounded-full"
//           />
//           <PanelLeftOpen />
//         </div>
//       </div>

//       {/* Expanded Sidebar on Hover */}
//       <div
//         className="fixed top-0 left-0 h-screen w-fit bg-gray-800 
//                    rounded-tr-3xl rounded-br-3xl 
//                    transform -translate-x-full group-hover:translate-x-0 
//                    transition-transform duration-300 ease-in-out z-30"
//       >
//         <div className="w-72 h-screen bg-black border-r-2 border-gray-400 rounded-tr-3xl rounded-br-3xl flex flex-col">
//           <div
//             onClick={() => {
//               navigate("/");
//             }}
//             className="flex p-4 cursor-pointer items-center gap-2"
//           >
//             <img
//               src="/assets/logo.png"
//               alt="Devplex AI Logo"
//               className="h-10 w-auto"
//             />
//             <span className="text-xl font-semibold text-white">Devplex AI</span>
//           </div>
//           <div className="p-4">
//             <button
//               onClick={() => {
//                 navigate("/");
//               }}
//               className="w-full flex items-center gap-2 bg-gray-800 text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               <MessageSquarePlus size={20} />
//               <span>Start new chat</span>
//             </button>
//           </div>

//           {/* Search Input */}
//           <div className="px-4 mb-4">
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={16}
//               />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
//               />
//             </div>
//           </div>

//           {/* Chat List */}
//           <div className="flex-1 overflow-y-auto px-4">
//             <div className="space-y-2">
//               <div className="px-4">
//                 <h2 className="text-gray-400 text-sm font-medium">Today</h2>
//               </div>
//               {SAMPLE_CHATS.map((chat) => (
//                 <button
//                   key={chat.id}
//                   className="w-full flex items-center gap-2 rounded-lg bg-gray-900 px-2 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                 >
//                   <MessageSquare size={18} />
//                   <span className="truncate max-w-[200px]">{chat.title}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-4 pb-4">
//             {bottomActions.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (item.link) {
//                     navigate(item.link);
//                   }
//                   if (item.label === "Sign Out") {
//                     handleLogout();
//                   }
//                 }}
//                 className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors ${
//                   item.className || ""
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* User Profile Section */}
//           <div className="border-t border-gray-800 p-4">
//             <div className="flex items-center gap-3">
//               <Avatar
//                 src={`${userAvatar}`}
//                 alt="User Avatar"
//                 size={40}
//                 className="h-10 w-10 rounded-full"
//               />
//               <div>
//                 <div className="text-gray-200">{user?.email}</div>
//                 <div className="text-gray-400 text-sm">Personal Plan</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppSideBar;
// import React, { useState, useEffect } from "react";
// import Avatar from "react-avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { fetchUserData } from "../../redux/authActions";
// import { logout } from "../../redux/authSlice";
// import {
//   PanelLeftOpen,
//   Search,
//   MessageSquarePlus,
//   Settings,
//   HelpCircle,
//   CreditCard,
//   Users,
//   LogOut,
//   Gift,
//   MessageSquare,
// } from "lucide-react";

// const AppSideBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const [userAvatar, setUserAvatar] = useState(user?.avatar);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userPrompt, setUserPrompt] = useState("");

//  useEffect(() => {
//    if (user?.chats) {
//      setChatHistory(
//        user.chats.map((chatId) => ({ _id: chatId, messages: [] }))
//      );
//    }
//  }, [user]);


//   const fetchChatHistory = async (chatId) => {
//     if (!chatId) return; 

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/chatHistory/${chatId}`
//       );
//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         console.error("Error fetching chat:", data.error);
//         return;
//       }

//       console.log(data);

//       // Find the first message from the user
//       const firstUserMessage = data.messages.find((msg) => msg.role === "user");
//       if (firstUserMessage) {
//         setUserPrompt(firstUserMessage.content);
//       }

//  setChatHistory((prevChats) =>
//    prevChats.map((chat) =>
//      chat._id === chatId ? { ...chat, messages: data.messages } : chat
//    )
//       );
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

// useEffect(() => {
//   chatHistory.forEach((chat) => fetchChatHistory(chat._id)); // Fetch all chat histories
// }, [chatHistory]);


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("user");

//     dispatch(logout());

//     toast.success("Sign Out Successfully");

//     setTimeout(() => {
//       window.location.href = "/";
//     }, 1000);
//   };

//   const bottomActions = [
//     { icon: Gift, label: "Get free tokens", className: "text-green-400" },
//     { icon: Settings, label: "Settings" },
//     { icon: HelpCircle, label: "Help Center" },
//     { icon: CreditCard, label: "My Subscription", link: "/pricing" },
//     { icon: LogOut, label: "Sign Out" },
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-screen w-16 group z-20">
//       <div className="w-16 h-full flex flex-col items-center justify-between bg-black bg-opacity-25 border border-gray-800 overflow-hidden">
//         <img
//           src="/assets/logo.png"
//           alt="Devplex AI Logo"
//           className="h-10 w-auto mt-2"
//         />
//         <div className="flex flex-col gap-4 items-center text-gray-400 mb-6">
//           <Avatar
//             src={`${userAvatar}`}
//             alt="User Avatar"
//             size={40}
//             className="h-10 w-10 rounded-full"
//           />
//           <PanelLeftOpen />
//         </div>
//       </div>

//       <div
//         className="fixed top-0 left-0 h-screen w-fit bg-gray-800 
//                    rounded-tr-3xl rounded-br-3xl 
//                    transform -translate-x-full group-hover:translate-x-0 
//                    transition-transform duration-300 ease-in-out z-30"
//       >
//         <div className="w-72 h-screen bg-black border-r-2 border-gray-400 rounded-tr-3xl rounded-br-3xl flex flex-col">
//           <div
//             onClick={() => navigate("/")}
//             className="flex p-4 cursor-pointer items-center gap-2"
//           >
//             <img
//               src="/assets/logo.png"
//               alt="Devplex AI Logo"
//               className="h-10 w-auto"
//             />
//             <span className="text-xl font-semibold text-white">Devplex AI</span>
//           </div>

//           <div className="p-4">
//             <button
//               onClick={() => navigate("/")}
//               className="w-full flex items-center gap-2 bg-gray-800 text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               <MessageSquarePlus size={20} />
//               <span>Start new chat</span>
//             </button>
//           </div>

//           {/* Chat List */}
//           <div className="flex-1 overflow-y-auto px-4">
//             <div className="space-y-2">
//               <div className="px-4">
//                 <h2 className="text-gray-400 text-sm font-medium">
//                   Chat History
//                 </h2>
//               </div>
//               {chatHistory.length > 0 ? (
//                 chatHistory.map((chatId) => (
//                   <button
//                     key={chatId} // Now key is set correctly
//                     onClick={() => fetchChatHistory(chatId)} // Fetch data on click
//                     className="w-full flex items-center gap-2 rounded-lg bg-gray-900 px-2 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
//                   >
//                     <MessageSquare size={18} />
//                     <span className="truncate max-w-[200px]">
//                       Chat {chatId}
//                     </span>
//                   </button>
//                 ))
//               ) : (
//                 <p className="text-gray-400 px-4">No chats found</p>
//               )}
//             </div>
//           </div>

//           {/* Bottom Actions */}
//           <div className="border-t border-gray-800 pt-4 pb-4">
//             {bottomActions.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (item.link) navigate(item.link);
//                   if (item.label === "Sign Out") handleLogout();
//                 }}
//                 className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors ${
//                   item.className || ""
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* User Profile Section */}
//           <div className="border-t border-gray-800 p-4">
//             <div className="flex items-center gap-3">
//               <Avatar
//                 src={`${userAvatar}`}
//                 alt="User Avatar"
//                 size={40}
//                 className="h-10 w-10 rounded-full"
//               />
//               <div>
//                 <div className="text-gray-200">{user?.email}</div>
//                 <div className="text-gray-400 text-sm">Personal Plan</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppSideBar;
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
  // ✅ Fetch all chat histories & update state properly
  useEffect(() => {
    if (user?.chats && user.chats.length > 0) {
      const fetchAllChats = async () => {
        try {
          const chatData = await Promise.all(
            user.chats.map(async (chatId) => {
              const response = await fetch(
                `${apiURL}/api/chatHistory/${chatId}`
              );
              if (!response.ok) throw new Error("Error fetching chat");
              const data = await response.json();
              return { _id: chatId, messages: data.messages };
            })
          );

          setChatHistory(chatData); // ✅ Store all chats properly
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchAllChats();
    }
  }, [user]); // ✅ Runs only when `user` changes

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
                    onClick={() => console.log("Chat Selected:", chat._id)}
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

