// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import { ToastContainer } from "react-toastify";
// import AuthSuccess from "./components/AuthSuccess";
// import WorkspacePage from "./pages/WorkspacePage";
// import PricingPage from "./pages/PricingPage";
// import ReportAbuse from "./pages/ReportAbuse";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import TermsConditions from "./pages/T&C";
// import Security from "./pages/Security";
// import AboutUs from "./pages/AboutUs";
// import Navbar from "./components/Navbar";


// const App = () => {
//   return (
//     <Router>
//       <ToastContainer />
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/auth-success" element={<AuthSuccess />} />
//         <Route path="/workspace/:sessionId" element={<WorkspacePage />} />
//         <Route path="/pricing" element={<PricingPage />} />
//         <Route path="/report-abuse" element={<ReportAbuse />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms-conditions" element={<TermsConditions />} />
//         <Route path="/security" element={<Security />} />
//         <Route path="/about" element={<AboutUs />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import AuthSuccess from "./components/AuthSuccess";
import WorkspacePage from "./pages/WorkspacePage";
import PricingPage from "./pages/PricingPage";
import ReportAbuse from "./pages/ReportAbuse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/T&C";
import Security from "./pages/Security";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Check if path matches /workspace/:sessionId
  const isWorkspacePage = location.pathname.startsWith("/workspace/");

  return (
    <>
      <ToastContainer />
      {!isWorkspacePage && <Navbar />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/workspace/:sessionId" element={<WorkspacePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/report-abuse" element={<ReportAbuse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default App;
