import { useEffect, useState, useRef, useCallback } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import ProfileR from './profileR';
import { IoClose } from 'react-icons/io5';
import { FaArrowDown } from 'react-icons/fa'; // Import an icon for the button

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true); // State to check if chat is at the bottom
    const inputRef = useRef(null);
    const chatRef = useRef(null);
    const scrollRef = useRef(null); // Ref to handle scroll

    const updateChatWidth = useCallback(() => {
        if (chatRef.current) {
            chatRef.current.clientWidth;
        }
    }, []);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setIsAtBottom(true); // Set state to indicate chat is at the bottom
    };

    useEffect(() => {
        if (selectedConversation && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedConversation]);

    useEffect(() => {
        const handlePopState = () => {
            if (selectedConversation) {
                setSelectedConversation(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('resize', updateChatWidth);

        updateChatWidth();

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('resize', updateChatWidth);
        };
    }, [selectedConversation, setSelectedConversation, updateChatWidth]);

    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    // Track scroll to check if we are at the bottom of the chat
    const handleScroll = () => {
        const chat = chatRef.current;
        if (chat) {
            const isAtBottom = chat.scrollHeight - chat.scrollTop === chat.clientHeight;
            setIsAtBottom(isAtBottom);
        }
    };

    return (
        <>
      <div
        className="flex items-center gap-4 bg-gray-700 p-4  cursor-pointer hover:bg-gray-600 transition"
        onClick={handleProfileClick}
      >
        <div className={`relative w-12 h-12 rounded-full overflow-hidden ${isOnline ? 'border-2 border-green-400' : 'border-2 border-gray-500'}`}>
          <img src={profilePic} alt="Profile" className="object-cover w-full h-full" />
          {/* <span
            className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-500'} border-2 border-gray-700`}
          /> */}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{selectedConversation?.fullName || 'User Name'}</h2>
          <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>


            {/* Chat messages container */}
            <div ref={chatRef} className="flex-1 overflow-y-auto" onScroll={handleScroll}>
                <Messages />
                {/* Ref to the bottom of the chat */}
                <div ref={scrollRef} />
            </div>

            {/* Message input */}
            <MessageInput inputRef={inputRef} />

            {/* Scroll to bottom button - only show when not at the bottom */}
{!isAtBottom && (
    <button
        className="fixed mb-5 mr-[-24px] bottom-4 right-4 p-1.5 sm:p-2 md:p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 
        sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 lg:right-10 lg:bottom-10"
        onClick={scrollToBottom}
    >
        <FaArrowDown className="text-base sm:text-lg md:text-xl" />
    </button>
)}


            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl bg-[#01090f82] z-50" onClick={handleCloseProfileModal}>
                    <div className="relative bg-[#647080] p-4 rounded-lg shadow-sm max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 z-10 cursor-pointer"
                            onClick={handleCloseProfileModal}
                        >
                            <IoClose className="text-gray-700 text-xl cursor-pointer" />
                        </button>
                        <ProfileR selectedConversation={selectedConversation} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
