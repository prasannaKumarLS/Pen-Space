import { useState, useReducer } from "react";
import NoteTile from "../components/noteTile";
import RichTextEditorWrapper from "../components/richTextEditorWrapper.jsx";
import AddNoteButton from "../components/addNoteButton";
import { writeNotes } from "../services/notesServices.js";
import LoadingCard from "../utils/loadingCard.jsx";
import TitleInput from "../components/noteTitleInput.jsx";

const dummy = [
  {
    id: 1,
    title: "Draft",
    category: "Marketing",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "2025-06-12T08:26:57.750Z",
  },
  {
    id: 2,
    title: "React JS",
    category: "Web Development",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "2025-06-11T08:26:57.750Z",
  },
  {
    id: 3,
    title: "Draft",
    category: "Marketing",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "2025-06-10T08:26:57.750Z",
  },
  {
    id: 4,
    title: "React JS",
    category: "Web Development",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "2025-05-12T08:26:57.750Z",
  },
];

export default function HomePage(props) {
  const username = props.username;
  const [notes, dispatch] = useReducer(notesReducer, dummy);
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0].id);
  const [isCardLoading, setIsCardLoading] = useState(false);

  function notesReducer(state, action) {
    switch (action.type) {
      case "ADD": {
        return [action.payload, ...state];
      }
      case "UPDATE": {
        return state.map((item) =>
          item.id === action.noteId ? { ...item, ...action.payload } : item
        );
      }
      case "REMOVE": {
        return state.filter((item) => item.id !== action.noteId);
      }
      default: {
        return state;
      }
    }
  }

  async function handleAddNoteClick(type) {
    setIsCardLoading(true);
    if (type === "CREATE") {
      const response = await writeNotes({
        username,
        title: "Untitled Draft",
        isActive: true,
      });
      if (response.error) {
        return console.log("Failed to write notes");
      }
      const formattedDate = new Date(response.modifiedOn);
      dispatch({
        type: "ADD",
        payload: { ...response, modifiedOn: formattedDate.toLocaleString() },
      });
    }
    return setIsCardLoading(false);
  }

  function updateNotesOnDebounce(response) {
    dispatch({
      type: "UPDATE",
      noteId: selectedNoteId,
      payload: {
        summary: response.summary,
        category: response.category,
      },
    });
  }

  function handleTitleInput(value) {
    dispatch({
      type: "UPDATE",
      noteId: selectedNoteId,
      payload: {
        title: value,
      },
    });
  }

  return (
    <div className="flex h-screen w-full bg-[#E7EFFC]">
      <section className="p-4 overflow-y-auto ml-1 " style={{ width: "19%" }}>
        <div className="flex flex-col gap-4 overlow-y-auto">
          <AddNoteButton addNoteOnClick={handleAddNoteClick} />
          {isCardLoading && <LoadingCard />}
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
              className="noteTile-container"
            />
          ))}
        </div>
      </section>
      <main className="pr-1 w-[100%] relative ">
        <RichTextEditorWrapper
          selectedNoteId={selectedNoteId}
          updateNotesOnDebounce={updateNotesOnDebounce}
        />
        <TitleInput
          placeholder="Title"
          value={
            notes[notes.findIndex((note) => note.id === selectedNoteId)]
              .title || ""
          }
          selectedNoteId={selectedNoteId}
          handleTitleInput={handleTitleInput}
        />
      </main>
    </div>
  );
}
