export default function ThinkingIndicator() {
  return (
    <div className="inline-flex items-center space-x-1 bg-transparent bg-opacity-40 backdrop-blur-sm rounded-full px-4 py-2">
      {[0, 0.2, 0.4].map((delay, idx) => (
        <span
          key={idx}
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
