import { Home, Grid2X2, Grid2X2Check, Grid3X3Icon } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [sideBarIndex, setSideBarIndex] = useState(0);
  const sideBars = [
    {
      icon: Home,
      name: "Home",
    },
    {
      icon: Grid2X2,
      name: "Grid",
    },
    {
      icon: Grid2X2Check,
      name: "Reports",
    },
    {
      icon: Grid3X3Icon,
      name: "Style",
    },
  ];
  function handleSideBar(index) {
    setSideBarIndex(index);
    // props.handleClick();
  }

  return (
    <aside
      className="flex flex-col items-center py-6 bg-white min-h-screen"
      style={{ width: "70px" }}
    >
      {/* Avatar */}
      <div className="mb-5">
        <button className="w-12 h-12 rounded-full duration-150 focus:outline-none hover:ring-2 hover:ring-blue-400 hover:ring-offset-3">
          <img
            src="https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
      {/* Icons */}
      <nav className="flex flex-col gap-6 items-center">
        {sideBars.map((item, index) => {
          const isActive = sideBarIndex === index;
          const Icon = item.icon;
          return (
            <div>
              <button
                key={index}
                className={`p-2 rounded-full transition duration-200 hover:bg-blue-100 hover:scale-110 active:scale-120 shadow-md ${
                  isActive ? "bg-blue-200" : ""
                } `}
                onClick={() => handleSideBar(index)}
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-blue-400"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
