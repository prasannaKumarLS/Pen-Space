export default function LoadingCard(props) {
  const shimmerStyle = {
    background: "linear-gradient(90deg, #a3a3a3 0%, #f4f4f5 40%, #cbd5e1 80%)",
    backgroundSize: "468px 100px",
  };

  return props.TYPE === "CARD" ? (
    <div
      className="
      w-full min-h-[150px] max-h-[150px] max-w-[300px] rounded-xl shadow-md p-4 flex flex-col gap-2.5 mac-glass-card transition-all duration-200 ease-out 
      overflow-hidden relative "
    >
      <div className="relative h-3 bg-gray-200 rounded-md w-1/2 overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={shimmerStyle}
        ></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="relative h-[10px] bg-gray-200 rounded-md w-full overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ ...shimmerStyle, animationDelay: "0.1s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-2/3 overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ ...shimmerStyle, animationDelay: "0.2s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-full overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ ...shimmerStyle, animationDelay: "0.3s" }}
          ></div>
        </div>
        <div className="relative h-[10px] bg-gray-200 rounded-md w-5/6 overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{ ...shimmerStyle, animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Button/Action Placeholder Line */}
      <div className="relative h-3 bg-gray-200 rounded-lg w-1/2 mt-0 overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{ ...shimmerStyle, animationDelay: "0.6s" }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="relative w-20 h-[50px]">
      <span className="absolute top-0 text-[1.25rem] text-white animate-loaderText loader-text font-semi-bold right-2">
        Loading
      </span>
      <span className="absolute bottom-0 block h-4 w-4 bg-white rounded-full animate-loaderBar loader-bar">
        <span className="absolute inset-0 bg-gray-200 rounded-full animate-loaderBarInner"></span>
      </span>
    </div>
  );
}
