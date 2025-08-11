import { useState, useEffect } from "react";
import InputText from "../utils/textInput";
import TitleLogo from "../components/projectTitle";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../services/authServices.js";
import MessageCard from "../components/messageCard";
import { getSession } from "../services/authServices.js";
import { Loader } from "lucide-react";

const userInfo = {
  name: "",
  username: "",
  password: "",
};

const message = {
  message: "",
  type: "",
};

const maxCharForName = 15;

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(userInfo);
  const [isSignUp, setIsSignUp] = useState(false);
  const [messageCard, setMessageCard] = useState(message);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const res = isSignUp
      ? await signUp(userData)
      : await signIn(userData.username, userData.password);
    if (res.error) {
      handleMessageCard(res.error, "ERROR");
      console.log(res.error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
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
              maxChar={maxCharForName}
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
          disabled={userData.name.length > maxCharForName}
          className={`w-full  text-white py-2 rounded-md transition mb-4 ${
            userData.name.length > maxCharForName
              ? "bg-gray-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            {isLoading && (
              <Loader className="animate-spin mt-[2px]" size={17} />
            )}
            {isSignUp ? "Sign Up" : "Sign In"}
          </div>
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
