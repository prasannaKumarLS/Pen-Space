export default function NoteTile(props) {
  const isActive = props.selectedNoteId === props.noteId;
  return (
    <button
      onClick={() => props.onClick(props.noteId)}
      className={`noteTile-container transition-transform duration-150 ease-in-out hover:shadow-[3px_3px_18px_rgba(0,0,0,0.1),0_5px_10px_rgba(0,0,0,0.1)] active:scale-95 active:shadow-inner
        ${
          isActive
            ? "bg-[#6082b6] scale-[1.05] hover:scale-[1.07]"
            : "bg-white hover:bg-[#F9FAFB] hover:scale-[1.05]"
        }`}
    >
      <div
        className={`text-left font-sans text-[1.1rem] font-semibold mb-0  whitespace-nowrap overflow-hidden text-ellipsis
        ${isActive ? "text-white" : "text-gray-500"} `}
      >
        {props.title}
      </div>
      <div className="mt-0 border-b border-gray-200" />
      <p
        className={` text-left text-[0.85rem] font-sans overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]
        ${isActive ? "text-white" : "text-gray-500"} `}
      >
        {props.summary}
      </p>
      <div className="noteCard-footer flex items-center justify-between mt-2">
        <span
          className={` text-[0.8rem] font-[Gill_Sans,'Gill_Sans_MT',Calibri,'Trebuchet_MS',sans-serif] px-2 py-[0.15em] rounded-full transition-colors duration-150
          ${isActive ? "bg-white text-gray-500" : "bg-[#F0CB6F] text-black"} `}
        >
          {props.category}
        </span>
        <span className="card-date text-[0.75rem] text-gray-200">
          {props.modifiedOn}
        </span>
      </div>
    </button>
  );
}
