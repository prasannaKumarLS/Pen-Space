import { useState } from "react";
import NoteTile from "../components/noteTile";
import RichTextEditor from "../components/richTextEditor";
import AddNoteButton from "../components/addNoteButton";

export default function HomePage() {
  const note = [
    {
      noteId: 1,
      title: "Draft",
      category: "Marketing",
      summary:
        "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
      modifiedOn: "Today 12:27",
    },
    {
      noteId: 2,
      title: "React JS",
      category: "Web Development",
      summary:
        "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
      modifiedOn: "Today 12:27",
    },
     {
      noteId: 3,
      title: "Draft",
      category: "Marketing",
      summary:
        "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
      modifiedOn: "Today 12:27",
    },
    {
      noteId: 4,
      title: "React JS",
      category: "Web Development",
      summary:
        "This is a JavaScript ES6 feature called object destructuring in the function parameters of .map().",
      modifiedOn: "Today 12:27",
    },
  ];
  const [selectedNoteId, setSelectedNoteId] = useState(note[0].noteId);

  return (
    <div className="flex h-screen w-full bg-[#E7EFFC]">
      <section className="p-4 overflow-y-auto ml-1 " style={{ width: "19%" }}>
        <div className="flex flex-col gap-4">
          <AddNoteButton />
          {note.map((item) => (
            <NoteTile
              key={item.noteId}
              noteId={item.noteId}
              title={item.title}
              summary={item.summary}
              category={item.category}
              modifiedOn={item.modifiedOn}
              onClick={() => setSelectedNoteId(item.noteId)}
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
