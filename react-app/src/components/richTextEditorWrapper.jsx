import { useEffect, useRef, useState } from "react";
import RichTextEditor from "../utils/richTextEditor.jsx";
import { getNotes } from "../services/notesServices.js";
import { writeNotes } from "../services/notesServices.js";
import { RefreshCcw } from "lucide-react";
import LoadingCard from "../utils/loadingCard.jsx";

export default function RichTextEditorWrapper(props) {
  const [rteContent, setRTEcontent] = useState("");
  const previousRteContent = useRef("");
  const [isSaving, setIsSaving] = useState(false);
  const deBounceTimer = useRef(null);
  const { selectedNoteId, isRteLoading, setRTELoading } = props;

  useEffect(() => {
    const noteContent = async () => {
      setRTELoading(true);
      const response = await getNotes({
        id: selectedNoteId,
        TYPE: "SUB_CONTENT",
      });
      if (response.error) {
        setRTEcontent("");
        previousRteContent.current = "";
        return console.log("Failed to get notes");
      }
      if (!response || !response[0]) {
        setRTEcontent("");
        previousRteContent.current = "";
        return;
      }
      setRTEcontent(response[0].notes);
      previousRteContent.current = response[0].notes;
      setRTELoading(false);
    };
    noteContent();
  }, [selectedNoteId]);

  useEffect(() => {
    if (rteContent === previousRteContent.current) {
      console.log("Content is same");
      return;
    }
    setIsSaving(true);
    if (deBounceTimer.current) {
      console.log("Clear debounce timer");
      clearTimeout(deBounceTimer.current);
    }
    deBounceTimer.current = setTimeout(async () => {
      const response = await writeNotes({
        id: selectedNoteId,
        notes: rteContent,
      });
      if (response.error) {
        setIsSaving(false);
        return console.log("Failed to save notes");
      }
      console.log("Response during debounce: ", response);
      props.updateNotesOnDebounce(response);
      previousRteContent.current = rteContent;
      setIsSaving(false);
    }, 3000);
    return () => clearTimeout(deBounceTimer.current);
  }, [rteContent, selectedNoteId]);

  return isRteLoading ? (
    <div className="flex items-center justify-center h-[85vh] w-full">
      <LoadingCard TYPE="TEXT" />
    </div>
  ) : (
    <div className="relative w-full h-screen]">
      {isSaving && (
        <div
          className="absolute top-[30px] right-[30px] z-10"
          title="Saving..."
        >
          <RefreshCcw className="w-5 h-5 text-gray-400 animate-pulse-spin" />
        </div>
      )}
      <RichTextEditor
        value={rteContent}
        onSaveNote={(value) => setRTEcontent(value)}
      />
    </div>
  );
}
