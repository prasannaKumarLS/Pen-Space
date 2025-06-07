import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import "./richTextEditor.css";

const NoteEditor = () => {
  const [value, setValue] = useState(
    "<p><strong>Prasanna kumar LS </strong></p><p><br></p><p>	I'm reading this book.</p>"
  );

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "color",
      "background",
      "align",
    ],
    []
  );

  const handleSaveNote = () => {
    console.log("Saving Note:");
    console.log("Content (HTML):", value);
    alert("Note content logged to console!");
  };
  console.log("Current editor value:", value);
  return (
    <div className="note-editor-container">
      <div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Start writing your note here..."
          style={{ height: "300px", marginBottom: "50px" }}
        />
      </div>
      <button onClick={handleSaveNote}></button>
    </div>
  );
};

export default NoteEditor;
