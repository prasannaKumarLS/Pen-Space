export default function LoadingCard() {
  return (
    <div
      className="
      w-full min-h-[150px] max-h-[150px] max-w-[300px] rounded-xl shadow-md p-4 flex flex-col gap-2.5 bg-white border border-gray-100 transition-all duration-200 ease-out
      overflow-hidden relative /* Ensure shimmer stays within bounds "
    >
      <div className="relative h-3 bg-gray-200 rounded-md w-1/2 overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="relative h-[10px] bg-gray-200 rounded-md w-full overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-2/3 overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-full overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-5/6 overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Button/Action Placeholder Line */}
      <div className="relative h-3 bg-gray-200 rounded-lg w-1/2 mt-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>
    </div>
  );
}
