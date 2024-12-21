import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AiOutlineClose } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";
import NavSide from "../NavigatSidebar/NavSidebar";
import { useNavigate } from 'react-router-dom';

const AI_ChatBot_FullSize = ({ onClose }) => {
    const navigate = useNavigate();

  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [selectedButton, setSelectedButton] = useState(''); // Track the selected button or chat

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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_KEY}`,
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
  const handleHomeClick = () => {
    // Only set the home as selected if no conversation is active
    if (selectedButton === '') {
        setSelectedButton('home'); // Set home if no other chat is selected
    }
    navigate('/'); // Navigate to the home page
};
  return (
    <div className="flex h-screen ">
      {/* Navbar Section */}
      <div className="w-16 h-auto sm:w-[50px] md:w-[60px] lg:w-[70px] max-sw-full   text-white flex flex-col items-center ">
        <NavSide />
      </div>

      {/* Chatbot Section */}
      <div className="flex-1 flex flex-col bg-transparent text-gray-100">
        {/* Header Section */}
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
      </header> <div className="absolute top-4 right-4">
<a
                   onClick={handleHomeClick}

>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 shadow-md"
          aria-label="Close"
        >
          <AiOutlineClose size={24} className="text-white" />

        </button>
        </a>

      </div>

        {/* Chat History */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-[#6470800c]"
        >
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full bg-[#6470800c]">
              <div className="text-center animate-fade-in bg-[#6470800c]">
                <h2 className="text-2xl font-bold text-purple-300 bg-[#6470800c]">
                  Hello, I am Chatzy Bot! 👋
                </h2>
                <p className="text-gray-400 mt-2 bg-[#6470800c]">Ask me anything, and I'll help you out!</p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.type === "question" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[70%] px-4 py-3 rounded-lg shadow-md ${
                    chat.type === "question"
                      ? "bg-purple-500 text-white self-end"
                      : "bg-gray-800 text-gray-300 self-start"
                  }`}
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
        <form onSubmit={generateAnswer} className="p-4  shadow-md">
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
    </div>
  );
};

export default AI_ChatBot_FullSize;
