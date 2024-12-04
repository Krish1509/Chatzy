import { useState, useEffect } from "react";
import Ai_ChatBot from "./Ai_ChatBot.jsx";
import ChatNotSelected from "../NavigatSidebar/ChatNotSelected.jsx";
import Sidebar from "../UserSidebar/Sidebar.jsx";

const AI_ChatHome = () => {
    const [isChatOpen, setIsChatOpen] = useState(true); // Chat visibility
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility for mobile
    const [selectedAi, setSelectedAi] = useState(false); // Track if AI is selected
    const [previousSelected, setPreviousSelected] = useState(null); // Track previous selection state

    // Effect to detect screen size
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750); // Adjust width as per your breakpoint
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCloseChat = () => {
        setIsChatOpen(false);
        if (isMobile) setIsSidebarVisible(true); // Show sidebar on mobile
        setPreviousSelected(selectedAi); // Store current selection (AI or conversation)
        setSelectedAi(false); // Deselect AI on close
    };

    const handleOpenChat = () => {
        setIsChatOpen(true);
        if (isMobile) setIsSidebarVisible(false); // Hide sidebar on mobile
        setSelectedAi(previousSelected); // Restore previous selection when reopening
    };

    return (
        <div className="flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            {isSidebarVisible && isMobile && (
                <div className="w-full h-full">
                    <Sidebar onOpenAiChat={handleOpenChat} />
                </div>
            )}
            {!isSidebarVisible || !isMobile ? (
                isChatOpen ? (
                    <Ai_ChatBot onClose={handleCloseChat} /> // Pass handleCloseChat function to Ai_ChatBot
                ) : (
                    <ChatNotSelected />
                )
            ) : null}
        </div>
    );
};

export default AI_ChatHome;
