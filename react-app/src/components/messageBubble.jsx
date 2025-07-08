import AIIconSparkle from "../utils/aiIcon";

export default function MessageBubble(props) {
  const data = props.data;
  return (
    <>
      {data.question && (
        <div className={`flex gap-1 justify-end mb-4`}>
          <div
            className={`max-w-xs lg:max-w-md px-4 py-3 shadow-md bg-gray-700 text-gray-100 rounded-full`}
          >
            <span
              style={{ whiteSpace: "pre-line" }}
              className="text-sm leading-relaxed"
            >
              {data.question}
            </span>
          </div>
        </div>
      )}
      {data.answer && (
        <div className={`flex gap-1 justify-start mb-4`}>
          <AIIconSparkle />
          <div
            className={`max-w-2xl lg:max-w-2xl px-4 py-3 shadow-md bg-blue-600 text-white rounded-3xl`}
          >
            <span
              style={{ whiteSpace: "pre-line" }}
              className="text-sm leading-relaxed"
            >
              {data.answer}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
