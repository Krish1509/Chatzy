import { useState } from "react";
import Ai_ChatBot from "./Ai_ChatBot.jsx";
import ChatNotSelected from "../NavigatSidebar/ChatNotSelected.jsx"; // Ensure the path is correct

const AI_ChatHome = () => {
    const [isChatOpen, setIsChatOpen] = useState(true); // Default state is true (chat open)

    const handleClose = () => {
        setIsChatOpen(false); // Close the chat and show "ChatNotSelected"
    };

    const handleOpenChat = () => {
        setIsChatOpen(true); // Open the chat again if needed
    };

    return (
        <div className="flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            {isChatOpen ? (
                <Ai_ChatBot onClose={handleClose} /> // Pass handleClose function to Ai_ChatBot
            ) : (
                <ChatNotSelected /> // Show this when chat is closed
            )}
        </div>
    );
};

export default AI_ChatHome;
