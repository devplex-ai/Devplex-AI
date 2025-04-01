import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "./context/UserDetailContext.jsx";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";

const Root = () => {
  const [userDetail, setUserDetail] = useState();

  return (
    <StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>

            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserDetailContext.Provider>
        </GoogleOAuthProvider>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
