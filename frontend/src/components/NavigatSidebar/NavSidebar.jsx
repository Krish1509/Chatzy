import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';
import LogoutButton from './LogoutButton';
import Profile from "./Profile";
import { IoClose } from 'react-icons/io5';
import { IoIosHome, IoIosInformationCircle, IoIosSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Settings from './Settings/Settings'; // Import the new Settings component
import AnimationIcon from "../AI_ChatBot/AnimatedIcon";
import ChatzyLogo from '../../assets/Chatzy_logo/ChatzyWithoutBG.png';

const NavSidebar = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const profilePic = authUser?.profilePic || 'defaultProfilePic.png';
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [, setIsProfileHovered] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isBgChangerOpen, setIsBgChangerOpen] = useState(false); // State to track if BG Changer is open
    const [selectedButton, setSelectedButton] = useState(''); // Track the selected button or chat
    const sidebarRef = useRef(null);

    const isOnline = authUser && onlineUsers.includes(authUser._id);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSelectedButton('');
                setIsSettingsOpen(false);
                setIsBgChangerOpen(false); // Close BG Changer when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(!isSettingsOpen);
        setSelectedButton('settings');
    };

    const handleHomeClick = () => {
        // Only set the home as selected if no conversation is active
        if (selectedButton === '') {
            setSelectedButton('home'); // Set home if no other chat is selected
        }
        navigate('/'); // Navigate to the home page
    };

    const handleAboutClick = () => {
        setSelectedButton('about');
        navigate('/about');
    };

    const handleBgChangeClick = () => {
        setIsBgChangerOpen(!isBgChangerOpen); // Toggle the BG Changer visibility
    };

    const handleChatbotClick = () => {
        setSelectedButton('chatbot'); // Set chatbot as the selected button
        navigate('/chatbot'); // Navigates to the chatbot route
    };

    return (
        <div ref={sidebarRef} className="flex flex-col h-full bg-[#6470800c] items-center relative border-r border-gray-400">
            {/* Logo Section */}
           {/* Logo Section */}
 {/* Logo Section */}
 <div className="mt-1 flex justify-center relative transition-all duration-300 ease-out">
                <a 
                    href="#"
                    onMouseEnter={() => setHoveredButton('Chatzy')}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="relative"
                >
                    {/* Glowing Effect Background */}
                    <div 
                        className={`absolute inset-[14px]  rounded-full ${hoveredButton === 'Chatzy' ? 'glowing-hover' : 'glowing-normal'}`}
                        style={{
                            transition: 'box-shadow 0.3s ease',
                            boxShadow: hoveredButton === 'Chatzy' ? '0 0 30px 10px rgba(59, 141, 153, 0.8)' : '0 0 15px 5px rgba(59, 141, 153, 0.4)',
                            zIndex: '-1',  // Keep the glow behind the logo
                        }}
                    />
                    {/* Logo Image */}
                    <img
                        src={ChatzyLogo}
                        alt="Chatzy Logo"
                        className={`w-16 h-auto sm:w-14 md:w-28 lg:w-24 max-w-full transition-all duration-300 ease-in-out transform ${hoveredButton === 'Chatzy' ? 'scale-110' : 'scale-100'} `}
                    />
                    {hoveredButton === 'Chatzy' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Chatzy
                        </div>
                    )}
                </a>
            </div>



            <hr className="w-3/4 border-t-1 border-gray-400 my-2" />

            {/* Home Button */}
            <div className="flex flex-col items-center gap-6 mt-3">
                <a 
                    href="#"
                    className={`relative  z-10 rounded-full ${selectedButton === 'home' ? 'bg-[#1F2937]' : ''} ${hoveredButton === 'home' ? 'glowing-hover' : ''}`}
                    onMouseEnter={() => setHoveredButton('home')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleHomeClick}
                    style={{
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: hoveredButton === 'home' ? '0 0 15px 5px rgba(59, 141, 153, 0.4)' : '0 0',
                    }}
                >
                    <IoIosHome className="text-white text-3xl cursor-pointer" />
                    {hoveredButton === 'home' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Home
                        </div>
                    )}
                </a>

                {/* About Button */}
                <a 
                    className={`relative  z-10 rounded-full ${selectedButton === 'about' ? 'bg-[#1F2937]' : ''} ${hoveredButton === 'home' ? 'glowing-hover' : ''}`}
                    onMouseEnter={() => setHoveredButton('about')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleAboutClick}
                    style={{
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: hoveredButton === 'about' ? '0 0 15px 5px rgba(59, 141, 153, 0.4)' : '0 0',
                    }}
                >
                    <IoIosInformationCircle className="text-3xl text-white cursor-pointer" />
                    {hoveredButton === 'about' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            About
                        </div>
                    )}
                </a>

                {/* Settings Button */}
                <a 
                    className={`relative  z-10 rounded-full ${selectedButton === 'settings' ? 'bg-[#1F2937]' : ''} ${hoveredButton === 'home' ? 'glowing-hover' : ''}`}
                    onMouseEnter={() => setHoveredButton('settings')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleSettingsClick} 
                    style={{
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: hoveredButton === 'settings' ? '0 0 15px 5px rgba(59, 141, 153, 0.4)' : '0 0',
                    }}
                >
                    <IoIosSettings className="text-3xl text-white cursor-pointer" />
                    {hoveredButton === 'settings' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Settings
                        </div>
                    )}
                </a>

                {/* Chatbot Button */}
                <a 
                    className={`relative  z-10 rounded-full  ${hoveredButton === 'chatbot' ? 'glowing-hover' : ''}`}
                    onMouseEnter={() => setHoveredButton('chatbot')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleChatbotClick}
                    style={{
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: hoveredButton === 'chatbot' ? '0 0 15px 5px rgba(59, 141, 153, 0.4)' : '0 0',
                    }}
                >
                    <AnimationIcon />
                    {hoveredButton === 'chatbot' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Chatbot
                        </div>
                    )}
                </a>
            </div>

            {/* Settings Box */}
            {isSettingsOpen && (
                <Settings 
                    onClose={() => setIsSettingsOpen(false)} 
                    isBgChangerOpen={isBgChangerOpen}
                    onBgChangeClick={handleBgChangeClick} 
                />
            )}

            {/* Bottom section */}
            <div className="mt-auto my-4 flex flex-col items-center gap-6">
                {/* Profile Button */}
                <div
                    className={`relative z-10  rounded-full cursor-pointer ${hoveredButton === 'profile' ? 'glowing-hover' : ''}`}
                    onMouseEnter={() => setIsProfileHovered('profile')}
                    onMouseLeave={() => setIsProfileHovered(false)}
                    onClick={handleProfileClick}
                    style={{
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: hoveredButton === 'Profile' ? '0 0 15px 5px rgba(59, 141, 153, 0.4)' : '0 0',
                    }}
                >
                    <div className="relative">
                        <img 
                            src={profilePic} 
                            alt="Profile" 
                            className={`w-10 h-10 rounded-full object-cover ${isOnline ? 'ring-2 ring-green-500' : ''}`}
                        />
                    </div>
                    {/* {isProfileHovered && (
                        <div className="absolute right-0 transform translate-x-full bottom-full mb-1 w-40 p-2 bg-gray-700 text-white text-sm font-semibold rounded-full shadow-lg z-50">
                            This is your profile.
                        </div>
                    )} */}
                     {hoveredButton === 'profile' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            This is your profile.
                            </div>
                    )}
                </div>

                {/* Logout Button */}
                <div
                    onMouseEnter={() => setIsLogoutHovered(true)}
                    onMouseLeave={() => setIsLogoutHovered(false)}
                >
                    <LogoutButton className="text-white text-2xl cursor-pointer" />
                    {isLogoutHovered && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg z-10 mb-4 bottom-1">
                            Logout
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-[#1d232ade] p-4 rounded-lg w-full max-w-sm relative">
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-400 hover:bg-gray-400 transition-colors duration-300 z-10 cursor-pointer"
                            onClick={handleCloseProfileModal}
                        >
                            <IoClose className="text-gray-700 text-xl cursor-pointer" />
                        </button>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavSidebar;

