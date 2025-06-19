import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./richTextEditor.css";

const NoteEditor = (props) => {
  const value = props.value;

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

  const handleSaveNote = (value) => {
    props.onSaveNote(value);
  };

  return (
    <div className="note-editor-container">
      <div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(value) => handleSaveNote(value)}
          modules={modules}
          formats={formats}
          readOnly={props.isReadOnly}
          placeholder="Start writing your note here..."
          style={{ height: "300px", marginBottom: "50px" }}
        />
      </div>
      <button onClick={handleSaveNote}></button>
    </div>
  );
};

export default NoteEditor;
