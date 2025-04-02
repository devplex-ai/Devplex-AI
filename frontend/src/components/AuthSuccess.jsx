import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const name = params.get("name")
      ? decodeURIComponent(params.get("name"))
      : "Unknown User";
    const email = params.get("email")
      ? decodeURIComponent(params.get("email"))
      : "No Email";
    const avatar = params.get("avatar")
      ? decodeURIComponent(params.get("avatar"))
      : "https://via.placeholder.com/150";

    // Debugging logs
    console.log("Received token:", token);
    console.log("Received userId:", userId);
    console.log("Received name:", name);
    console.log("Received email:", email);
    console.log("Received avatar:", avatar);

    if (token && userId) {
      try {
        // Store token and user data (Consider using sessionStorage for security)
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: userId, name, email, avatar })
        );

        console.log("User data saved successfully");

        // Redirect user to dashboard/home
        setTimeout(() => {
          navigate("/", { replace: true }); // Prevents navigating back to login
        }, 500);
      } catch (error) {
        console.error("Error storing authentication data:", error);
        navigate("/login", { replace: true });
      }
    } else {
      console.error("Missing authentication parameters");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <p>Logging in, please wait...</p>;
};

export default AuthSuccess;
