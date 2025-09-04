import { Loader, Check, X } from "lucide-react";
import InlineMessageCard from "../../utils/messageCard";
import { useState } from "react";
import bcrypt from "bcryptjs";

const inputStyle =
  "w-full px-4 py-3 pr-10 rounded-lg bg-white/10 text-white placeholder-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out focus:scale-[1.02]";

const initialPasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function SecurityInfo(props) {
  const { currentPassword, isLoading, messageCard } = props;
  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  async function currentPasswordHandleOnChange(e) {
    const { value } = e.target;
    setPasswordData((prev) => ({ ...prev, currentPassword: value }));
    const isPasswordMatch = await bcrypt.compare(value, currentPassword);
    setIsPasswordMatch(isPasswordMatch);
  }

  const disableUpdate =
    !passwordData.currentPassword?.trim() ||
    !passwordData.confirmNewPassword?.trim() ||
    !passwordData.newPassword?.trim() ||
    !isPasswordMatch ||
    passwordData.newPassword !== passwordData.confirmNewPassword ||
    isLoading;

  const isConfirmMatch =
    passwordData.confirmNewPassword &&
    passwordData.newPassword === passwordData.confirmNewPassword;

  return (
    <div>
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md">
        <span className="text-2xl text-white font-semibold mb-6 block">
          Change Password
        </span>

        <div className="flex flex-col gap-4">
          {/* Current Password */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-white/80 tracking-wide"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter current password"
                className={inputStyle}
                value={passwordData.currentPassword}
                onChange={currentPasswordHandleOnChange}
                required
              />
              {passwordData.currentPassword.length > 0 && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200">
                  {isPasswordMatch ? (
                    <Check className="text-green-400" size={20} />
                  ) : (
                    <X className="text-red-400" size={20} />
                  )}
                </span>
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-white/80 tracking-wide"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              required
              className={inputStyle}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 w-1/2">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-white/80 tracking-wide"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Re-enter new password"
                value={passwordData.confirmNewPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmNewPassword: e.target.value,
                  }))
                }
                required
                className={inputStyle}
              />
              {passwordData.confirmNewPassword.length > 0 && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200">
                  {isConfirmMatch ? (
                    <Check className="text-green-400" size={20} />
                  ) : (
                    <X className="text-red-400" size={20} />
                  )}
                </span>
              )}
            </div>

            {/* Mismatch instruction */}
            {passwordData.confirmNewPassword &&
              passwordData.newPassword !== passwordData.confirmNewPassword && (
                <p className="text-red-400 text-sm mt-1 transition-opacity duration-300 ease-in-out opacity-100">
                  Passwords do not match
                </p>
              )}
          </div>

          {/* Submit */}
          <div className="flex flex-col items-end mt-4">
            <button
              className={`font-medium rounded-xl h-10 w-24 shadow-md transition-all duration-300 ease-in-out flex flex-row gap-1 justify-center items-center
                ${
                  disableUpdate
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-green-700 text-white hover:bg-green-600 hover:shadow-lg hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-green-400"
                }`}
              onClick={async () => {
                try {
                  await props.handleOnSave(passwordData.newPassword);
                } finally {
                  setPasswordData(initialPasswordData);
                }
              }}
              disabled={disableUpdate}
            >
              {isLoading && <Loader className="animate-spin w-4 h-5" />}
              Update
            </button>
          </div>

          {/* Message Card */}
          {messageCard.type && (
            <div className="w-full flex justify-center items-center mt-4">
              <div className="w-fit">
                <InlineMessageCard
                  message="Password updated Successfully."
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
