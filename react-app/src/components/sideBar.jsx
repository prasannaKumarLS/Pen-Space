import { Home, Grid2X2, TextIcon, MessageCircle } from "lucide-react";

export default function Sidebar(props) {
  const sideBars = [
    {
      icon: Home,
      name: "Home",
    },
    {
      icon: TextIcon,
      name: "Grid",
    },
    {
      icon: MessageCircle,
      name: "Reports",
    },
    {
      icon: Grid2X2,
      name: "Style",
    },
  ];

  return (
    <div
      className="flex flex-col items-center py-6 min-h-screen bg-gradient-to-tr from-[#3a3f52] to-[#1a1e28]"
      style={{ width: "100px" }}
    >
      <div className="mb-5 flex flex-col items-center">
        <button className="w-12 h-12 rounded-full duration-150 focus:outline-none hover:ring-2 hover:ring-[#80BFFF] hover:ring-offset-3">
          <img
            src="https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
        <span className="text-center text-white font-semibold mb-0 text-[1rem] max-w-[100px] break-words leading-tight">
          {props.name}
        </span>
      </div>

      <nav className="flex flex-col gap-6 items-center">
        {sideBars.map((item, index) => {
          const isActive = props.activeSideBar === index;
          const Icon = item.icon;
          return (
            <div key={index}>
              <button
                key={index}
                className={`p-2 rounded-full ease-in-out active:scale-95 duration-200 hover:bg-[#8e90a157] shadow-md ${
                  isActive ? "bg-[#0A7AFF] scale-125 hover:scale-[1.25]" : "bg-[#1a1e28]  hover:scale-[1.25]"
                } `}
                onClick={() => props.handleSideBar(index)}
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-[#0A7AFF]"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
