import React, { useState } from "react";
import InputText from "./textInput";
import TitleLogo from "./projectTitle";

export default function SignIn() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const updateUserData = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", userData.username);
    console.log("Password:", userData.password);
    // Add your login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen background-container">
      <div className="background-overlay" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10"
      >
        <TitleLogo />
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
