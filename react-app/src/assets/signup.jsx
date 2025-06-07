import { useState } from "react";
import InputText from "./components/textInput";
import TitleLogo from "./components/projectTitle";
import { useNavigate } from "react-router-dom";
import api from "../api";
import MessageCard from "./components/messageCard";

export default function SignIn() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [showMessage, setShowMessage] = useState({
    success: false,
    error: false,
  });

  const updateUserData = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMessageCard = (success = "SUCCESS") => {
    const isSuccess = success === "SUCCESS";
    setShowMessage({ success: isSuccess, error: !isSuccess });
    setTimeout(() => {
      setShowMessage({ success: false, error: false });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(isSignUp ? "/login/signup" : "/login/signIn", userData);
      if (isSignUp) {
        setIsSignUp(false);
        setUserData({ name: "", username: "", password: "" });
        handleMessageCard("SUCCESS");
      } else {
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      setErrorMessage(errorMessage);
      handleMessageCard("ERROR");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen background-container">
      <div className="background-overlay" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10"
      >
        <TitleLogo />
        {showMessage.success && (
          <MessageCard
            message="User registered successfully!"
            type="SUCCESS"
          />
        )}
        {isSignUp && (
          <>
            {userData.name && (
              <h2 className="text-2xl text-center mb-3 animate-slideIn">
                Hey, {userData.name}
              </h2>
            )}
            <InputText
              onChange={(e) => updateUserData("name", e.target.value)}
              value={userData.name}
              field="fullName"
              name="Name"
            />
          </>
        )}
        <InputText
          onChange={(e) => updateUserData("username", e.target.value)}
          value={userData.username}
          field="username"
          name="Username"
        />
        <InputText
          onChange={(e) => updateUserData("password", e.target.value)}
          value={userData.password}
          field="password"
          name={isSignUp ? "Create Password" : "Password"}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {showMessage.error && (
          <MessageCard message={errorMessage} type="ERROR" />
        )}
        <p className="text-center text-sm text-gray-700">
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}
