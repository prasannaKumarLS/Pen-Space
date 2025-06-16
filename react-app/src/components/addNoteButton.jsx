import { useState, useRef, useEffect } from "react";
import { Plus, FileText, UploadCloud } from "lucide-react";

export default function AddNoteButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside); //Mount listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); //Unmount listener
    };
  }, []);

  const menuItems = [
    {
      label: "Add Note",
      icon: <FileText size={20} className="text-gray-600" />,
      type: "CREATE",
    },
    {
      label: "Upload Document",
      icon: <UploadCloud size={20} className="text-gray-600" />,
      type: "UPLOAD",
    },
  ];

  return (
    <div className="flex justify-end font-[Gill Sans] z-[2]">
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-[80px] h-9 gap-1 bg-blue-400 rounded-full text-white font-semibold shadow-xl hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-[#a2c3ee] transition-all duration-300 ease-in-out"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>Add</span>
          <Plus
            size={22}
            className={`transition-transform duration-300 ease-in-out 
              ${isOpen ? "rotate-45" : "rotate-0"}`}
          />
        </button>

        <div
          className={`absolute top-full mt-1 right-0 w-56 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  props.addNoteOnClick(item.type);
                  setIsOpen(false);
                }}
                className="flex items-center justify-items-start w-full px-3 py-3 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150"
                role="menuitem"
              >
                {item.icon}
                <span className="ml-3 font-medium text-[0.8rem]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
