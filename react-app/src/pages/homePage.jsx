import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/login/session")
      .then((res) => setName(res.data.name))
      .catch(() => navigate("/")); // Redirect to login
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen background-container">
      <div className="background-overlay" />
      <div className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-lg shadow-xl w-full max-w-sm relative z-10">
        <h1 className="text-2xl">Welcome, {name}!</h1>
      </div>
    </div>
  );
}
