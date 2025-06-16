import { useEffect, useState } from "react";
import { getNotes } from "../services/notesServices";
import NoteTile from "../components/noteTile";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";

export default function AllNotesDashboard(props) {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [session, setSession] = useState({});

  useEffect(() => {
    async function fetchSession() {
      const data = await sessionInfo();
      setSession(data);
    }
    fetchSession();
    const noteContent = async () => {
      const response = await getNotes({
        TYPE: "NOTES",
        username: session.username,
        isActive: true,
      });
      if (response.error) {
        return console.log("Failed to get notes");
      }
      setNotes(response);
    };
    noteContent();
  }, [props.username, sessionInfo, session.username]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[40px] gap-y-[0px] p-6 bg-blue-50 w-full">
      {notes.map((item) => (
        <NoteTile
          key={item.id}
          noteId={item.id}
          title={item.title}
          summary={item.summary}
          category={item.category}
          modifiedOn={item.modifiedOn}
          onClick={() => setSelectedNoteId(item.id)}
          selectedNoteId={selectedNoteId}
          className="w-full h-full min-h-[150px] max-h-[250px] max-w-[400px] rounded-xl shadow-[ -1px_-1px_10px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-2.5 transition
    duration-200  ease-out hover:scale-105 hover:shadow-[0_2px_12px_rgba(0,0,0,0.16)] "
        />
      ))}
    </div>
  );
}
