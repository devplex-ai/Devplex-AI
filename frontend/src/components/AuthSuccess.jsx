import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const name = params.get("name");
    const email = params.get("email");
    const avatar = params.get("avatar");

    // Debug: Log received parameters
    console.log("Received token:", token);
    console.log("Received userId:", userId);
    console.log("Received name:", name);
    console.log("Received email:", email);
    console.log("Received avatar:", avatar);

    if (token && userId) {
      try {
        // Store data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: userId, name, email, avatar })
        );

        console.log("User data saved to localStorage");

        // Redirect user to dashboard
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.error("Error saving authentication data:", error);
        navigate("/login");
      }
    } else {
      console.error("Missing authentication parameters");
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging in, please wait...</p>;
};

export default AuthSuccess;
