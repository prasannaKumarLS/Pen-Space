import { useState, useEffect } from "react";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import HomePage from "./homePage";
import Sidebar from "../components/sideBar";
import AllNotesDashboard from "../pages/allNotesDashboard";
import ChatInterface from "./chatInterface";

export default function Dashboard() {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [session, setSession] = useState({});
  const [activeSideBar, setActiveSideBar] = useState(0);
  const components = [
    <HomePage />,
    <AllNotesDashboard />,
    <ChatInterface name={session.name} />,
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#18181b] via-[#232326] to-[#2a3040]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(255,255,255,0.10)_0%,transparent_70%)]" />
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8 w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-2">Welcome</h2>
          <p className="text-white/80">
            This is a modern, macOS-style glassmorphic background in Tailwind.
          </p>
        </div>
      </main>
    </div>,
  ];
  useEffect(() => {
    async function fetchSession() {
      const data = await sessionInfo();
      setSession(data);
    }
    fetchSession();
  }, [sessionInfo]);

  return (
    <main className="flex flex-row h-screen w-full">
      <Sidebar
        name={session.name}
        handleSideBar={(index) => setActiveSideBar(index)}
        activeSideBar={activeSideBar}
      />
      {components[activeSideBar]}
    </main>
  );
}
