export default function SummaryCard(props) {
  const AiStarIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
  return (
    <div className="rounded-2xl shadow-2xl px-6 py-5 w-full mx-auto max-h-fit mt-2 bg-white">
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center justify-center bg-purple-100 rounded-full p-2">
          <AiStarIcon className="text-purple-500 w-6 h-6" />
        </span>
        <h2 className="font-sans text-[1.3rem] font-semibold text-gray-800">Summary</h2>
      </div>
      <p className="text-gray-700 leading-relaxed font-sans">
        {props.summary ||
          `I've changed the styling significantly to match your request. The input
        now has a transparent background with only a single line underneath that
        changes color when you click on it. The text is larger and bolder to
        look like a title, and I've also added a dynamic date and time display
        below it to complete the look from your screenshot.`}
      </p>
    </div>
  );
}
