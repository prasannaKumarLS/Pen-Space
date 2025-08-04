import { useState, useReducer, useEffect } from "react";
import NoteTile from "../components/noteTile";
import RichTextEditorWrapper from "../components/richTextEditorWrapper.jsx";
import AddNoteButton from "../components/addNoteButton";
import { writeNotes, uploadNotes } from "../services/notesServices.js";
import LoadingCard from "../utils/loadingCard.jsx";
import TitleInput from "../components/noteTitleInput.jsx";
import { getNotes } from "../services/notesServices.js";

function notesReducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      return [...action.payload];
    }
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

export default function HomePage(props) {
  const username = props.username;
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [loadingCheck, setIsLoadingCheck] = useState({
    isCardLoading: false,
    isRTELoading: false,
    isNotesQuering: false,
  });

  useEffect(() => {
    const noteContent = async () => {
      setIsLoadingCheck((prev) => {
        return { ...prev, isNotesQuering: true };
      });
      const response = await getNotes({
        TYPE: "NOTES",
        username: username,
        isActive: true,
      });
      if (response.error) {
        return console.log("Failed to load notes");
      }
      if (response.length > 0) {
        dispatch({
          type: "LOAD",
          payload: response.map((item) => {
            const formattedDate = new Date(item.modifiedOn).toLocaleString();
            return {
              ...item,
              modifiedOn: formattedDate,
            };
          }),
        });
        setIsLoadingCheck((prev) => {
          return { ...prev, isNotesQuering: false };
        });
      } else {
        handleAddNoteClick("CREATE");
        setIsLoadingCheck((prev) => {
          return { ...prev, isNotesQuering: false };
        });
      }
    };
    noteContent();
  }, [username]);

  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId)
      return setSelectedNoteId(notes[0].id);
  }, [notes, selectedNoteId]);

  async function handleAddNoteClick(type, event) {
    setIsLoadingCheck((prev) => {
      return {
        ...prev,
        isCardLoading: true,
      };
    });
    try {
      let payload;
      switch (type) {
        case "CREATE": {
          const response = await writeNotes({
            username,
            title: "Untitled Draft",
            isActive: true,
          });
          if (response.error) {
            return console.error("Failed to write notes");
          }
          payload = response;
          break;
        }
        case "UPLOAD": {
          const file = event.target.files[0];
          if (!file) {
            return console.log("File is empty");
          }
          const formData = new FormData();
          formData.append("document", file);
          const response = await uploadNotes(formData);
          if (response.error) {
            return console.error("Failed to upload notes", response.error);
          }
          payload = response;
          break;
        }
        default: {
          return console.error("Action Type is empty.");
        }
      }
      if (payload) {
        const formattedDate = new Date(payload.modifiedOn).toLocaleString();
        dispatch({
          type: "ADD",
          payload: {
            ...payload,
            modifiedOn: formattedDate,
          },
        });
      }
    } finally {
      setIsLoadingCheck((prev) => {
        return {
          ...prev,
          isCardLoading: false,
        };
      });
    }
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

  async function handleOnDelete(noteId) {
    const response = await writeNotes({
      id: noteId,
      isActive: false,
    });
    if (response.error) {
      return console.error("Failed to delete notes");
    }
    dispatch({
      type: "REMOVE",
      noteId,
    });
    return setSelectedNoteId(null);
  }

  return (
    <div className="flex w-full h-screen">
      {loadingCheck.isNotesQuering ? (
        <LoadingCard TYPE="CARD_SPINNER" />
      ) : (
        <>
          <section
            className="pl-6 pt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ffffffc5] scrollbar-track-transparent scrollbar-thumb-rounded-full h-[93vh]"
            // Add the height while converting to Navigation Bar h-[93vh]
            style={{ width: "23%" }}
          >
            <div className="flex flex-col gap-4 overlow-y-auto">
              <AddNoteButton addNoteOnClick={handleAddNoteClick} />
              {loadingCheck.isCardLoading && <LoadingCard TYPE="CARD" />}
              {notes.map((item) => (
                <NoteTile
                  key={item.id}
                  noteId={item.id}
                  title={item.title}
                  summary={item.summary}
                  category={item.category}
                  modifiedOn={item.modifiedOn}
                  onClick={() => setSelectedNoteId(item.id)}
                  onDelete={handleOnDelete}
                  selectedNoteId={selectedNoteId}
                  className="noteTile-container"
                  type="HOME_PAGE"
                />
              ))}
            </div>
          </section>
          <main className="pr-1 w-[100%] relative">
            <RichTextEditorWrapper
              selectedNoteId={selectedNoteId}
              updateNotesOnDebounce={updateNotesOnDebounce}
              setRTELoading={(value) =>
                setIsLoadingCheck((prev) => {
                  return {
                    ...prev,
                    isRTELoading: value,
                  };
                })
              }
              isRteLoading={loadingCheck.isRTELoading}
            />
            {!loadingCheck.isRTELoading && (
              <TitleInput
                placeholder="Title"
                value={
                  notes.length > 0 && selectedNoteId
                    ? notes[
                        notes.findIndex((note) => note.id === selectedNoteId)
                      ].title
                    : ""
                }
                selectedNoteId={selectedNoteId}
                handleTitleInput={handleTitleInput}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
