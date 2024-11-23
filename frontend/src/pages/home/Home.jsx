import Sidebar from '../../components/UserSidebar/Sidebar';
import NavSidebar from '../../components/NavigatSidebar/NavSidebar';
import { useEffect, useState, useRef, useCallback } from 'react';
import ChatNotSelected from "../../components/NavigatSidebar/ChatNotSelected";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from '../../zustand/useConversation';
import AiChatHome from "../../components/AI_ChatBot/AI_ChatHome";

const Home = () => {
    const { selectedConversation, setSelectedConversation } = useConversation(); // Zustand store
    const [chatWidth, setChatWidth] = useState(0);
    const [showAiChatHome, setShowAiChatHome] = useState(false); // State for AI Chat Home
    const chatRef = useRef(null);

    const updateChatWidth = useCallback(() => {
        if (chatRef.current) {
            setChatWidth(chatRef.current.clientWidth);
        }
    }, []);

    // Ensure AI Chat is closed if a conversation is selected
    useEffect(() => {
        if (selectedConversation) {
            setShowAiChatHome(false);
        }
    }, [selectedConversation]);

    // Handle browser back button and window resize events
    useEffect(() => {
        const handlePopState = () => {
            if (selectedConversation) {
                setSelectedConversation(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('resize', updateChatWidth);

        // Initial width update
        updateChatWidth();

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('resize', updateChatWidth);
        };
    }, [selectedConversation, setSelectedConversation, updateChatWidth]);

    return (
        <div className="flex h-screen rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            {/* Left Sidebar */}
            <NavSidebar />

            {/* Conversations Sidebar */}
            <div className={`md:flex ${selectedConversation || showAiChatHome ? 'hidden' : 'flex'}`}>
                <Sidebar onOpenAiChat={() => setShowAiChatHome(true)} />
            </div>

            {/* Chat Display */}
            <div
                ref={chatRef}
                className={`flex flex-col w-full ${
                    selectedConversation || showAiChatHome ? 'w-full' : 'hidden md:block w-full'
                } ${chatWidth <= 550 ? 'border-l border-gray-400' : ''}`}
            >
                {/* Display Message Container or Fallbacks */}
                {!selectedConversation && !showAiChatHome ? (
                    <ChatNotSelected />
                ) : showAiChatHome ? (
                    <AiChatHome onClose={() => setShowAiChatHome(false)} />
                ) : (
                    <MessageContainer conversation={selectedConversation} />
                )}
            </div>
        </div>
    );
};

export default Home;
