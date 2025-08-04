import { useEffect, useState } from "react";
import { getNotes } from "../services/notesServices";
import NoteTile from "../components/noteTile";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import LoadingCard from "../utils/loadingCard";
import { MoveRight, MoveLeft } from "lucide-react";

export default function AllNotesDashboard(props) {
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(1);
  const batchSize = 12;

  useEffect(() => {
    async function fetchSession() {
      await sessionInfo();
    }
    fetchSession();
    setIsLoading(true);
    const noteContent = async () => {
      const response = await getNotes({
        TYPE: "NOTES",
        startIndex: startIndex,
        batchSize: batchSize,
        isActive: true,
        fetchTotalCount: true,
      });
      if (response.error) {
        setIsLoading(false);
        return console.log("Failed to get notes");
      }
      setNotes(response);
      setIsLoading(false);
    };
    noteContent();
  }, [props.username, sessionInfo, startIndex, batchSize]);

  return (
    <div className="w-screen h-screen">
      {isLoading ? (
        <div className="w-full">
          <LoadingCard TYPE="CARD_SPINNER" />
        </div>
      ) : (
        <div className="grid grid-cols-4 grid-rows-3 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[0px] pl-6 pr-6 pt-4 pb-0 h-[89vh]">
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
              className="w-full h-full min-h-[150px] max-h-[250px] min-w-[250px] rounded-xl shadow-[-1px_-1px_10px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-2.5 transition
    duration-200  ease-out hover:scale-105 hover:shadow-[0_2px_12px_rgba(0,0,0,0.16)]"
            />
          ))}
        </div>
      )}
      <div className="flex flex-row items-start justify-between w-full">
        <MoveLeft
          size={30}
          className={`${
            startIndex === 1
              ? "bg-[#8e90a157] "
              : "bg-[#0275d8] hover:bg-[#025aa5] cursor-pointer"
          } text-white rounded-lg p-1 ml-[25px]`}
          onClick={() => {
            if (startIndex === 1) return;
            setStartIndex((prev) => prev - batchSize);
          }}
        />
        <MoveRight
          size={30}
          className={`${
            startIndex + batchSize > (notes[0]?.totalCount ?? 0)
              ? "bg-[#8e90a157]"
              : "bg-[#0275d8] hover:bg-[#025aa5] cursor-pointer"
          } text-white rounded-lg p-1 mr-[25px]`}
          onClick={() => {
            if (startIndex + batchSize > (notes[0]?.totalCount ?? 0)) return;
            setStartIndex((prev) => prev + batchSize);
          }}
        />
      </div>
    </div>
  );
}
