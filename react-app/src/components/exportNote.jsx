import { useState } from "react";
import { generateNoteDocument } from "../services/notesServices";
import InlineMessageCard from "./messageCard";
import { FileCodeIcon, Loader } from "lucide-react";

export default function ExportNoteDocument(props) {
  const [isError, setIsError] = useState(false);
  const { noteId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const getTimestamp = () => {
    const date = new Date();
    return (
      date.toISOString().slice(0, 10).replace(/-/g, "") +
      "_" +
      date.toTimeString().slice(0, 5).replace(":", "")
    );
  };

  async function handleOnClick() {
    setIsLoading(true);
    const response = await generateNoteDocument({
      noteId,
    });
    if (!response || response.error) {
      console.log("Download failed : ", response.error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return setIsLoading(false);
    }
    const fileURL = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `Exported_Pen_Space_Document_${getTimestamp()}.pdf`;
    link.click();
    setIsLoading(false);
    window.URL.revokeObjectURL(fileURL);
  }

  return (
    <>
      <div className="bg-transparent font-sans p-2 absolute top-[30px] right-[20px]">
        <button onClick={handleOnClick} className="group" disabled={isLoading}>
          <div
            className={`flex flex-row gap-1 text-[0.85rem] font-semibold px-3 py-[0.4em] rounded-full shadow-sm transition-colors duration-200 ease-in-out
        ${
          isLoading
            ? "bg-green-500 text-white"
            : "bg-white text-black hover:bg-blue-500 hover:text-white"
        }`}
          >
            {" "}
            {isLoading ? (
              <Loader className="animate-spin w-4 h-5" />
            ) : (
              <FileCodeIcon className="w-4 h-5" />
            )}
            <span className="group-hover:text-white">
              {isLoading ? "Getting Ready" : "Export"}
            </span>
          </div>
        </button>
      </div>
      {isError && (
        <div className="bg-transparent font-sans p-2 absolute top-[60px] right-[20px]">
          <InlineMessageCard
            message={"Error while generating document"}
            type="ERROR"
            isCompact={true}
          />
        </div>
      )}
    </>
  );
}
