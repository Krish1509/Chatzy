import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AiOutlineClose } from "react-icons/ai";
import { FaRobot } from "react-icons/fa"; // Icon for AI bot

const Ai_ChatBot = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const generateAnswer = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
  
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");
  
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);
  
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],  
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: "Sorry - Something went wrong. Please try again!" },
      ]);
    } finally {
      setGeneratingAnswer(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-transparent text-gray-100">
      {/* Header Section (AI Assistant and Online Status) */}
      <header className="flex flex-col p-4 bg-gradient-to-r from-purple-800 to-indigo-600 shadow-lg bg-opacity-70">
        <div className="flex items-center gap-2">
          <FaRobot size={24} className="text-white" />
          <span className="text-xl font-semibold tracking-wide">Chatzy Bot</span>
        </div>
        {/* Online status */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" /> {/* Online status */}
          <span className="text-white text-sm">Online</span>
        </div>
      </header>

      {/* Close button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 shadow-md"
          aria-label="Close"
        >
          <AiOutlineClose size={24} className="text-white" />
        </button>
      </div>

      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-opacity-30 bg-black/40 rounded-tl-xl rounded-tr-xl"
      >
        {chatHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-purple-300 animate__animated animate__fadeIn animate__delay-2s">Hello, I am Chatzy Bot! 👋</h2>
              <p className="text-gray-400 mt-2">Ask me anything, and I'll help you out!</p>
              <p className="text-xl text-gray-500 mt-4">😊</p>
            </div>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.type === "question" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[70%] px-4 py-3 rounded-lg shadow-md transition-transform ${chat.type === "question" ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white self-end animate-bounce-right" : "bg-gray-800 text-gray-300 self-start animate-bounce-left"}`}
              >
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {generatingAnswer && (
          <div className="flex items-start">
            <div className="px-4 py-2 bg-purple-500 text-white rounded-lg animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={generateAnswer} className="p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900 shadow-md">
        <div className="flex gap-3">
          <textarea
            required
            className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            rows="2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generateAnswer(e);
              }
            }}
          ></textarea>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg transition-all ${generatingAnswer ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={generatingAnswer}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ai_ChatBot;
