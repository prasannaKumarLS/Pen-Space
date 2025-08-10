import {
  Home,
  Grid2X2,
  TextIcon,
  MessageCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { logout } from "../services/authServices";
import logo from "../assets/PenSpaceLogo.png";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Settings",
    icon: <Settings size={20} className="text-gray-600" />,
    action: "SETTINGS",
  },
  {
    label: "Logout",
    icon: <LogOut size={20} className="text-gray-600" />,
    action: "LOGOUT",
  },
];

const sideBars = [
  {
    icon: Home,
    name: "Home",
  },
  {
    icon: TextIcon,
    name: "Notes",
  },
  {
    icon: MessageCircle,
    name: "Chat",
  },
  {
    icon: Grid2X2,
    name: "Style",
  },
];

export default function NavigationBar(props) {
  const { handleSideBar } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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

  async function handleMenuClick(action) {
    if (action === "LOGOUT") {
      const response = await logout();
      if (response.error) {
        return console.log("Error while logging out : ", response.error);
      }
      navigate("/");
    }
  }

  return (
    <div
      className="flex flex-row items-center justify-between h-[60px] min-w-full"
      style={{ width: "100px" }}
    >
      <div className="flex flex-row items-center p-2 w-[250px]">
        <button
          className="rounded-full overflow-hidden w-11 h-11"
          onClick={() => handleSideBar(0)}
        >
          <img
            src={logo}
            alt="App Logo"
            className="w-full h-full object-contain"
          />
        </button>
        <div className="p-2 bg-transparent text-white">
          <h2 className="text-2xl text-white tracking-wide animate-slideIn">
            P<span className="text-white">é</span>n Spac
            <span className="text-white">é</span>
          </h2>
        </div>
      </div>
      <nav className="flex flex-row gap-7 justify-center w-full mr-[100px] ">
        {sideBars.map((item, index) => {
          const isActive = props.activeSideBar === index;
          const Icon = item.icon;
          return (
            <div key={index}>
              <button
                className={`p-[6px] rounded-full ease-in-out active:scale-95 duration-200 shadow-md ${
                  isActive
                    ? "bg-[#0A7AFF] scale-125 hover:scale-[1.25] "
                    : "bg-[#1a1e28] scale-125 hover:scale-[1.25] hover:bg-[#8e90a157]"
                } `}
                onClick={() => handleSideBar(index)}
              >
                <div className={`flex flex-row gap-1  ${isActive ? "" : ""}`}>
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200  ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-[#0A7AFF]"
                    }`}
                  />
                  {isActive && (
                    <span className="text-white text-[0.7rem] mr-[3px]">
                      {item.name}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>
      <div className="relative z-10" ref={dropdownRef}>
        <div className="flex flex-col items-center p-1">
          <button
            className="w-7 h-7 rounded-full duration-150 focus:outline-none hover:ring-2 hover:ring-[#80BFFF] hover:ring-offset-3"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open profile menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
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
        <div
          className={`absolute top-full mt-0 right-0 w-40 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top-right
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
                onClick={() => handleMenuClick(item.action)}
                className="flex items-center justify-items-start w-full px-2 py-2 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150"
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
