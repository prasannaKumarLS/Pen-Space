import { useState, useEffect } from "react";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import HomePage from "./homePage";
import Sidebar from "../components/sideBar";
import AllNotesDashboard from "../pages/allNotesDashboard";
import LoadingCard from "../utils/loadingCard";

export default function Dashboard() {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [session, setSession] = useState({});
  const [activeSideBar, setActiveSideBar] = useState(0);
  const components = [
    <HomePage />,
    <AllNotesDashboard />,
    <div className="flex items-center justify-center h-[30px] bg-blue-50">
      <button>Upload document</button>
      <input type="file" style={{ display: "none" }} />
    </div>,
    <HomePage />,
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
