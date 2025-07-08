export default function LoadingCard(props) {
  const type = props.TYPE || "CARD";
  const shimmerStyle = {
    background: "linear-gradient(90deg, #a3a3a3 0%, #f4f4f5 40%, #cbd5e1 80%)",
    backgroundSize: "468px 100px",
  };
  switch (type) {
    case "CARD":
      return (
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
      );
    case "TEXT":
      return (
        <div className="relative w-20 h-[50px]">
          <span className="absolute top-0 text-[1.25rem] text-white animate-loaderText loader-text font-semi-bold right-2">
            Loading
          </span>
          <span className="absolute bottom-0 block h-4 w-4 bg-white rounded-full animate-loaderBar loader-bar">
            <span className="absolute inset-0 bg-gray-200 rounded-full animate-loaderBarInner"></span>
          </span>
        </div>
      );
    case "CARD_SPINNER":
      return (
        <div className="flex items-center justify-center min-h-screen w-full bg-transparent">
          <div className="relative w-[60px] h-[60px]">
            <div className="absolute inset-0 m-auto w-full h-full bg-[#9CA3AF] rounded-[10px] animate-loading" />
            <div className="absolute inset-0 m-auto w-1/2 h-1/2 bg-[#D1D5DB] rounded-[6px] z-10 animate-loading-reverse" />
          </div>
        </div>
      );
  }
}
