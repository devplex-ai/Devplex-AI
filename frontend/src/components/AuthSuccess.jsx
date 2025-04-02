import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice"; // Import the Redux action

const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    console.log("Received token:", token);
    console.log("Received userId:", userId);
    console.log("Received name:", name);
    console.log("Received email:", email);
    console.log("Received avatar:", avatar);

    if (token && userId) {
      try {
        const userData = { _id: userId, name, email, avatar }; // Ensure _id matches Redux

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userId", userId);

        // Dispatch to Redux
        dispatch(setUser({ user: userData, token }));

        console.log("User data saved successfully");

        // Redirect user to dashboard/home
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } catch (error) {
        console.error("Error storing authentication data:", error);
        navigate("/login", { replace: true });
      }
    } else {
      console.error("Missing authentication parameters");
      navigate("/login", { replace: true });
    }
  }, [navigate, dispatch]);

  return <p>Logging in, please wait...</p>;
};

export default AuthSuccess;
