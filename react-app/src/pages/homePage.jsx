import { useEffect, useState } from "react";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import SideBar from "../components/sideBar";

export default function HomePage() {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [session, setSession] = useState({});

  useEffect(() => {
    async function fetchSession() {
      const data = await sessionInfo();
      setSession(data);
      console.log(data);
    }
    fetchSession();
  }, [sessionInfo]);

  return (
    <div className="flex h-screen w-full">
      <SideBar />

      {/* Cards Column - 30% */}
      <section
        className="bg-gray-100 p-4 overflow-y-auto"
        style={{ width: "15%" }}
      >
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow p-4">
              <h2 className="font-bold text-lg mb-2">Card {item}</h2>
              <p className="text-gray-600 text-sm">
                Some card content goes here.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RTE Area - 60% */}
      <main className="bg-white p-6" style={{ width: "70%" }}>
        <h1 className="text-2xl font-bold mb-4">Rich Text Editor Area</h1>
        <div className="border rounded-xl p-4 min-h-[400px]">
          {/* Insert your RTE component here */}
          <textarea
            className="w-full h-64 p-2 rounded border focus:outline-none"
            placeholder="Start typing..."
          />
        </div>
      </main>
    </div>
  );
}
