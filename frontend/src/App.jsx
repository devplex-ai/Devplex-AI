import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import AuthSuccess from "./components/AuthSuccess";
import WorkspacePage from "./pages/WorkspacePage";
import PricingPage from "./pages/PricingPage";
import Subscription from "./pages/Subscription";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth-success" element={<AuthSuccess />} />
        <Route path="/workspace/:sessionId" element={<WorkspacePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/subscription" element={<Subscription/>}/>
      </Routes>
    </Router>
  );
};

export default App;
