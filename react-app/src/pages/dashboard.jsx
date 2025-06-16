import { useState, useEffect } from "react";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import HomePage from "./homePage";
import Sidebar from "../components/sideBar";
import AllNotesDashboard from "../pages/allNotesDashboard";

export default function Dashboard() {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [session, setSession] = useState({});
  const [activeSideBar, setActiveSideBar] = useState(0);
  const components = [
    <HomePage />,
    <AllNotesDashboard />,
    <HomePage />,
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
