import { useState, useEffect } from "react";
import AuthenticateAndGetSessionInfo from "../services/authenticateAndGetSession";
import logo from "../assets/PenSpaceLogo.png";
import { User, Moon, Headphones, LockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUser, writeUser } from "../services/authServices";
import PersonalInfo from "../components/settings/personalInfo";
import LoadingCard from "../utils/loadingCard";
import ContactUs from "../components/settings/contactus";
import SecurityInfo from "../components/settings/security";
import bcrypt from "bcryptjs";

const BCRYPT_SALT_ROUNDS = 10;

const listOfSettings = [
  { label: "Personal Info", icon: User },
  { label: "Security", icon: LockIcon },
  { label: "Appearance", icon: Moon },
  { label: "Support", icon: Headphones },
];

const initialUserData = {
  name: "",
  email: "",
  id: "",
};

const initalMessage = {
  message: null,
  type: null,
};

export default function Settings() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const sessionInfo = AuthenticateAndGetSessionInfo();
  const [userData, setUserData] = useState(initialUserData);
  const [loadingCheck, setIsLoadingCheck] = useState({
    isQuerying: false,
    isUpdating: false,
  });
  const [messageCard, setMessageCard] = useState(initalMessage);

  useEffect(() => {
    async function fetchSession() {
      setIsLoadingCheck((prev) => ({
        ...prev,
        isQuerying: true,
      }));
      const data = await sessionInfo();
      const response = await getUser({ id: data.userId });
      const responseData = response[0];
      setUserData((prev) => ({
        ...prev,
        name: responseData.name,
        email: responseData.email,
        password: responseData.hashPassword,
        id: responseData.id,
      }));
      setIsLoadingCheck((prev) => ({
        ...prev,
        isQuerying: false,
      }));
    }
    fetchSession();
  }, [sessionInfo]);

  const handleMessageCard = (message, type) => {
    setMessageCard({
      message,
      type,
    });
    setTimeout(() => {
      setMessageCard(initalMessage);
    }, 4000);
  };

  async function handleOnSaveForPersonalInfo() {
    setIsLoadingCheck((prev) => ({
      ...prev,
      isUpdating: true,
    }));
    const response = await writeUser({
      ...userData,
      id: userData.id,
    });
    if (response.error) {
      handleMessageCard("Failed to update the user.", "ERROR");
    }
    handleMessageCard("User information updated Successfully.", "SUCCESS");
    return setIsLoadingCheck((prev) => ({
      ...prev,
      isUpdating: false,
    }));
  }

  async function handleOnSaveForSecurity(password) {
    setIsLoadingCheck((prev) => ({
      ...prev,
      isUpdating: true,
    }));
    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const response = await writeUser({
      ...userData,
      id: userData.id,
      password: hashPassword,
    });
    if (response.error) {
      handleMessageCard("Failed to update the user.", "ERROR");
    }
    handleMessageCard("Password Updated successfully.", "SUCCESS");
    return setIsLoadingCheck((prev) => ({
      ...prev,
      isUpdating: false,
    }));
  }

  const section = () => {
    switch (selectedIndex) {
      case 0:
        return loadingCheck.isQuerying ? (
          <div className="flex flex-col items-end justify-end h-full w-3/4">
            <LoadingCard TYPE="CARD_SPINNER" />
          </div>
        ) : (
          <div className="w-1/2">
            <PersonalInfo
              userData={userData}
              isLoading={loadingCheck.isUpdating}
              messageCard={messageCard}
              nameOnChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              emailOnChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              handleOnSave={handleOnSaveForPersonalInfo}
            />
          </div>
        );
      case 1:
        return (
          <div className="w-1/2">
            <SecurityInfo
              messageCard={messageCard}
              isLoading={loadingCheck.isUpdating}
              userData={userData}
              currentPassword={userData.password}
              handleOnSave={handleOnSaveForSecurity}
            />
          </div>
        );
      case 3:
        return <ContactUs />;
      default:
        return <></>;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-tr from-[#3a3f52] to-[#1a1e28] ">
      <div className="flex flex-row items-center p-2">
        <button
          className="rounded-full overflow-hidden w-11 h-11"
          onClick={() => navigate("/home")}
        >
          <img
            src={logo}
            alt="App Logo"
            className="w-full h-full object-contain"
          />
        </button>
        <div className="p-2 bg-transparent text-white">
          <h2 className="text-2xl tracking-wide animate-slideIn">
            P<span>é</span>n Spac<span>é</span>
          </h2>
        </div>
      </div>
      <div className="h-[90vh] mx-6 p-6 rounded-3xl shadow-lg bg-gradient-to-br from-[#3a3f52] to-[#1a1e28] flex flex-col">
        <div className=" ml-[110px]">
          <span className="text-white text-3xl">Settings</span>
        </div>
        <div className="flex flex-row flex-grow">
          {/* {List of Menu} */}
          <div className="flex flex-col mt-10 gap-2 ml-16">
            {listOfSettings.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-3 py-4 px-7 transition-all duration-200 group rounded-2xl
              ${
                isActive
                  ? "bg-white/10 text-blue-300"
                  : "text-white hover:bg-white/10 hover:text-blue-300"
              }`}
                >
                  <Icon
                    size={24}
                    className={`${
                      isActive
                        ? "text-blue-300"
                        : "text-white group-hover:text-blue-300"
                    } transition-colors duration-200`}
                  />
                  <span className="text-xl">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="border-l border-white/20 mx-6 h-5/6"></div>
          {/* {Section } */}
          {section()}
        </div>
        {/* Logout */}
        <div className="flex justify-center mt-auto">
          <button className="font-medium rounded-xl h-10 w-24 shadow-md transition-all duration-200 ease-out bg-red-600 text-white hover:bg-red-500 hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-red-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
