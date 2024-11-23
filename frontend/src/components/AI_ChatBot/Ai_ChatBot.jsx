import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AiOutlineClose } from "react-icons/ai"; // Import Close Icon

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
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCVVHL9GiztzG4siMvlPJYd_Y6oVE0i19c`,
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
      setGeneratingAnswer(false); // Always clear the "Thinking..." state
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-gray-100 z-50">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-4">
        {/* Header */}
        <header className="text-center py-4 relative">
          <h1 className="text-4xl font-extrabold neon-text">Chat AI</h1>
          {/* Close Button */}
          <button
            onClick={onClose} // Calls the onClose function passed from parent
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all flex items-center justify-center"
            aria-label="Close"
          >
            <AiOutlineClose size={20} />
          </button>
        </header>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 p-4 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-md border border-gray-700 relative hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold neon-glow mb-4">Welcome to Chat AI! 👋</h2>
                <p className="text-gray-400 mb-6">Ask me anything, and I'll assist you!</p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  chat.type === "question" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg transition-all ${
                    chat.type === "question"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <ReactMarkdown className="markdown">{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block p-3 bg-blue-800 text-white rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={generateAnswer} className="rounded-lg shadow-lg p-4 bg-gray-900">
          <div className="flex gap-3">
            <textarea
              required
              className="flex-1 bg-gray-800 text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              className={`px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
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

export default Ai_ChatBot;
