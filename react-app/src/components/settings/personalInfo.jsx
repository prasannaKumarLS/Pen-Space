import { Loader } from "lucide-react";
import InlineMessageCard from "../messageCard";

const maxCharForName = 225;

export default function PersonalInfo(props) {
  const { userData, isLoading, messageCard } = props;

  return (
    <div>
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md">
        <span className="text-2xl text-white font-semibold mb-6 block">
          Personal Information
        </span>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-white/80 tracking-wide"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className={`w-1/2 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 shadow-sm transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#1a1e28] 
        ${
          (userData.name?.length || 0) > maxCharForName
            ? "border border-red-500 focus:ring-red-400 "
            : "border border-white/20 focus:ring-blue-400 mb-3"
        } `}
            value={userData.name}
            onChange={props.nameOnChange}
            required
          />
          {(userData.name?.length || 0) > maxCharForName && (
            <p className="text-red-400 text-sm">
              Name must be {maxCharForName} characters or less.
            </p>
          )}
          <label
            htmlFor="email"
            className="text-sm font-medium text-white/80 tracking-wide"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            value={userData.email}
            onChange={props.emailOnChange}
            className={`w-1/2 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 shadow-sm transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#1a1e28]`}
          />
          <div className="flex flex-col items-end">
            <button
              className={`font-medium rounded-xl h-10 w-24 shadow-md transition-all duration-200 ease-out flex flex-row gap-1 justify-center items-center
    ${
      (userData.name?.trim() || userData.email?.trim()) && !isLoading
        ? "bg-green-700 text-white hover:bg-green-600 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
        : "bg-gray-500 text-gray-300 cursor-not-allowed"
    }`}
              onClick={props.handleOnSave}
              disabled={
                (!userData.name?.trim() && !userData.email?.trim()) || isLoading
              }
            >
              {isLoading && <Loader className="animate-spin w-4 h-5" />}
              Save
            </button>
          </div>
          {messageCard.type && (
            <div className="w-full flex justify-center items-center">
              <div className="w-fit">
                <InlineMessageCard
                  message="User Information updated Successfully."
                  type={messageCard.type}
                  isCompact={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
