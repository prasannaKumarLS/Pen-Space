import { useState, useEffect } from "react";
import InputText from "../utils/textInput";
import TitleLogo from "../components/projectTitle";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../services/authServices.js";
import MessageCard from "../components/messageCard";
import { getSession } from "../services/authServices.js";

const userInfo = {
  name: "",
  username: "",
  password: "",
};

const message = {
  message: "",
  type: "",
};

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(userInfo);
  const [isSignUp, setIsSignUp] = useState(false);
  const [messageCard, setMessageCard] = useState(message);

  const updateUserData = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMessageCard = (message, type) => {
    setMessageCard({
      message,
      type,
    });
    setTimeout(() => {
      setMessageCard(message);
    }, 4000);
  };

  function onSignup() {
    handleMessageCard("User registered successfully!", "SUCCESS");
    setUserData(userInfo);
    setIsSignUp(false);
  }

  function onSignIn() {
    handleMessageCard("User logged in successfully!", "SUCCESS");
    navigate("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = isSignUp
      ? await signUp(userData)
      : await signIn(userData.username, userData.password);
    if (res.error) {
      handleMessageCard(res.error, "ERROR");
      console.log(res.error);
    } else {
      return isSignUp ? onSignup() : onSignIn();
    }
  };

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session && !session.error) {
        return navigate("/home", { replace: true });
      }
    }
    checkSession();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen background-container">
      <div className="background-overlay" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10"
      >
        <TitleLogo />
        {messageCard.type === "SUCCESS" && (
          <MessageCard message={messageCard.message} type="SUCCESS" />
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
        {messageCard.type === "ERROR" && (
          <MessageCard message={messageCard.message} type="ERROR" />
        )}
        <p className="text-center text-sm text-gray-700">
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setUserData(userInfo);
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}
