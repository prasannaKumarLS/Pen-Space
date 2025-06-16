import { useEffect, useRef, useState } from "react";
import RichTextEditor from "../utils/richTextEditor.jsx";
import { getNotes } from "../services/notesServices.js";
import { writeNotes } from "../services/notesServices.js";
import { RefreshCcw } from "lucide-react";

export default function RichTextEditorWrapper(props) {
  const [rteContent, setRTEcontent] = useState("");
  const previousRteContent = useRef("");
  const [isSaving, setIsSaving] = useState(false);
  const deBounceTimer = useRef(null);
  const { selectedNoteId } = props;

  useEffect(() => {
    const noteContent = async () => {
      const response = await getNotes({
        id: selectedNoteId,
        TYPE: "SUB_CONTENT",
      });
      if (response.error) {
        return console.log("Failed to get notes");
      }
      if (!response.notes) {
        return;
      }
      setRTEcontent(response[0].notes);
      previousRteContent.current = response[0].notes;
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

  return (
    <div className="relative w-full h-full">
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
