import { useState } from "react";
import NoteTile from "../components/noteTile";
import RichTextEditor from "../components/richTextEditor";
import AddNoteButton from "../components/addNoteButton";
import { writeNotes } from "../services/notesServices.js";

const dummy = [
  {
    id: 1,
    title: "Draft",
    category: "Marketing",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "Today 12:27",
  },
  {
    id: 2,
    title: "React JS",
    category: "Web Development",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "Today 12:27",
  },
  {
    id: 3,
    title: "Draft",
    category: "Marketing",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "Today 12:27",
  },
  {
    id: 4,
    title: "React JS",
    category: "Web Development",
    summary:
      "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
    modifiedOn: "Today 12:27",
  },
];

export default function HomePage(props) {
  const username = props.username;
  const [notes, setNotes] = useState(dummy);
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0].id);

  async function handleAddNoteClick(type) {
    if (type === "ADD") {
      const response = await writeNotes({
        username,
        title: "Untitled Draft",
        isActive: true,
      });
      if (response.error) {
        return console.log("Failed to write notes");
      }
      setNotes((prev) => [response.data, ...prev]);
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#E7EFFC]">
      <section className="p-4 overflow-y-auto ml-1 " style={{ width: "19%" }}>
        <div className="flex flex-col gap-4 overlow-y-auto">
          <AddNoteButton addNoteOnClick={(type) => handleAddNoteClick(type)} />
          {notes.map((item) => (
            <NoteTile
              key={item.noteId}
              noteId={item.id}
              title={item.title}
              summary={item.summary}
              category={item.category}
              modifiedOn={item.modifiedOn}
              onClick={() => setSelectedNoteId(item.id)}
              selectedNoteId={selectedNoteId}
            />
          ))}
        </div>
      </section>
      <main className="pr-1 w-[100%]">
        <RichTextEditor />
      </main>
    </div>
  );
}
