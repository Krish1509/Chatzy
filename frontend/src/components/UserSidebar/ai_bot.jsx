import useConversation from "../../zustand/useConversation";

const AiBot = () => {
    const { isAiSelected, setAiSelected, setSelectedConversation } = useConversation();

    const handleSelectAi = () => {
        setAiSelected(); // Mark AI Bot as selected
        setSelectedConversation(null); // Deselect any conversation
    };

    return (
        <div
            className={`flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r ${
                isAiSelected ? "from-sky-600 to-sky-500" : "from-gray-800 to-gray-700"
            } shadow-md hover:shadow-lg transform transition-transform hover:scale-105 cursor-pointer`}
            onClick={handleSelectAi}
        >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 text-white shadow-md">
                <span className="text-xl">🤖</span>
                <div className="absolute top-0 left-0 text-[8px] bg-gray-800 text-cyan-300 px-1 rounded-full font-bold">
                    AI
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-white text-sm">ChatzyBot</p>
                    <span className="text-lg text-cyan-400">✨</span>
                </div>
                <p className="text-xs text-gray-300 mt-1 italic">
                    Hello! How can I assist you today?
                </p>
            </div>
        </div>
    );
};

export default AiBot;
