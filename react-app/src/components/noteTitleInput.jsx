import { writeNotes } from "../services/notesServices";

export default function NoteTitleInput(props) {
  const { value } = props;

  async function handleOnBlur(e) {
    const value = e.target.value;
    const response = await writeNotes({
      id: props.selectedNoteId,
      title: value,
    });
    if (response.error) {
      console.log("Error while writing title of the note");
    }
  }

  return (
    <div className="bg-transparent font-sans p-2 absolute top-[50px] left-[40px]">
      <div className="w-[250px] max-w-2xl">
        <input
          type="text"
          value={value}
          onChange={(e) => props.handleTitleInput(e.target.value)}
          onBlur={(e) => handleOnBlur(e)}
          placeholder={props.placeholder || "Enter here"}
          className="
            w-full
            bg-transparent
            border-0 
            border-b 
            border-gray-300
            focus:border-blue-500
            text-[1.5rem]
            font-bold
            text-gray-800
            py-2
            focus:outline-none
            focus:ring-0
            transition-colors
            duration-300
            ease-in-out
            placeholder-gray-400
          "
        />
      </div>
    </div>
  );
}
