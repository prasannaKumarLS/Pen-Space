import { useState, useEffect, useRef, useReducer } from "react";
import { Send } from "lucide-react";
import MessageBubble from "../components/messageBubble";
import { writeChatData, getChatData } from "../services/chatServices.js";
import ThinkingEffect from "../utils/thinkingEffect.jsx";

function chatReducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      return [...action.payload];
    }
    case "ADD": {
      return [...state, action.payload];
    }
    case "ADD_MANY": {
      return [...state, ...action.payload];
    }
    case "UPDATE_BY_ID": {
      return state.map((item) =>
        item.id === action.id ? { ...item, ...action.payload } : item
      );
    }
    case "UPDATE_BY_INDEX": {
      return state.map((item, index) => {
        index === action.index ? { ...item, ...action.payload } : item;
      });
    }
    default: {
      return state;
    }
  }
}

export default function ChatTypewriter(props) {
  const initialPrompt = {
    answer: `Hey ${props.name}, How may I help you?`,
  };
  const [chatMessages, dispatch] = useReducer(chatReducer, [initialPrompt]);
  const [promptInputText, setPromptInputText] = useState("");
  const [loadingState, setLoadingState] = useState({
    isTyping: false,
    isDisable: false,
    isQuerying: false,
  });
  const typewriterTimeout = useRef();
  const listRef = useRef();

  useEffect(() => {
    const queryChatData = async () => {
      const response = await getChatData();
      if (response.error) {
        return console.log("Failed to load the chat");
      }
      if (response.length > 0) {
        dispatch({
          type: "ADD_MANY",
          payload: response,
        });
        scrollToBottom(100);
      }
    };
    queryChatData();
  }, []);

  function scrollToBottom(delay = 0) {
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth" });
    }, delay);
  }

  function typeWriterEffect(response, temporaryId) {
    let i = 0;
    const { answer } = response;
    console.log(response);
    function typeChar() {
      dispatch({
        type: "UPDATE_BY_ID",
        id: temporaryId,
        payload: { answer: answer.slice(0, i + 1) },
      });
      i++;
      scrollToBottom();
      if (i < answer.length) {
        typewriterTimeout.current = setTimeout(typeChar, 18);
      } else {
        dispatch({
          type: "UPDATE_BY_ID",
          id: temporaryId,
          payload: { id: response.id },
        });
        setLoadingState((prev) => ({ ...prev, isDisable: false }));
      }
    }
    typeChar();
  }

  async function handleSend(e) {
    e.preventDefault();
    const trimmedInput = promptInputText.trim();
    if (!trimmedInput || loadingState.isTyping) return;
    const dummyId = "|1|";
    dispatch({
      type: "ADD",
      payload: {
        id: dummyId,
        question: trimmedInput,
      },
    });
    setPromptInputText("");
    setLoadingState((prev) => ({ ...prev, isTyping: true, isDisable: true }));
    scrollToBottom(100);
    const response = await writeChatData({
      question: trimmedInput,
    });
    setLoadingState((prev) => ({ ...prev, isTyping: false }));
    if (response.error) {
      return console.log("Failed to write chat");
    }
    typeWriterEffect(response, dummyId);
  }

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => clearTimeout(typewriterTimeout.current);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#00000071] bg-gradient-to-tr from-[#3a3f52] to-[#1a1e28]">
      <div className="p-3 ml-3 bg-transparent text-white">
        <h2 className="text-2xl text-white tracking-wide animate-slideIn">
          P<span className="text-white">é</span>n Spac
          <span className="text-white">é Chat</span>
        </h2>
      </div>
      <div className="flex flex-col flex-grow max-w-7xl mx-auto my-auto bg-transparent overflow-hidden h-[90vh] w-full">
        <div className="flex-grow p-4 overflow-y-auto bg-transparent scrollbar-thin pl-4 scrollbar-thumb-[#ffffffc5] scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {chatMessages.map((data, id) => (
            <MessageBubble key={id} data={data} />
          ))}
          {loadingState.isTyping && <ThinkingEffect />}
          <div ref={listRef} />
        </div>
        <form
          onSubmit={handleSend}
          className="flex items-center p-4 pt-0 bg-transparent border-gray-700"
        >
          <input
            type="text"
            value={promptInputText}
            onChange={(e) => setPromptInputText(e.target.value)}
            placeholder="Type here..."
            className="flex-grow px-4 py-3 rounded-full bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-colors"
            disabled={loadingState.isDisable}
            autoFocus
          />
          <button
            type="submit"
            className="ml-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loadingState.isDisable}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
}
