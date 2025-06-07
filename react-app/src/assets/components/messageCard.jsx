export default function InlineMessageCard({ message, type = "SUCCESS" }) {
  const isSuccess = type === "SUCCESS";

  const bgColor = isSuccess ? "bg-green-100" : "bg-rose-100";
  const borderColor = isSuccess ? "border-green-400" : "border-rose-400";
  const textColor = isSuccess ? "text-green-800" : "text-rose-800";
  const barColor = isSuccess ? "bg-green-600" : "bg-rose-500";

  return (
    <div
      className={`relative w-full ${bgColor} ${borderColor} ${textColor} px-4 py-2 rounded shadow-sm mt-1 mb-0.5 border animate-fade-out-delay`}
    >
      <strong className="font-medium text-sm">{message}</strong>
      <div
        className={`absolute left-0 bottom-0 h-1 ${barColor} rounded-b animate-progress-bar w-full`}
      />
    </div>
  );
}
