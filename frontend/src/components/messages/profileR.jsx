import { useSocketContext } from '../../context/SocketContext'; // Import the SocketContext

const ProfileR = ({ selectedConversation }) => {
    const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    const fullName = selectedConversation?.fullName || 'Name';
    const userName = selectedConversation?.username || 'Username';
    const gender = selectedConversation?.gender || 'Gender';
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id); // Determine if the selected conversation user is online

    return (
        <div className="relative flex flex-col items-center p-6 bg-gradient-to-b from-[#2C3E50] to-[#4A6274] rounded-lg max-w-sm mx-auto border-2 border-gray-700 shadow-2xl transform transition-transform hover:scale-105">
           
            {/* Profile Picture with Online Indicator */}
            <div className="relative">
                <img src={profilePic} alt="Profile" className="w-28 h-28 border-[4px] border-gray-700 rounded-full mb-4 shadow-xl" />
                {isOnline && <span className="absolute top-2 right-2 w-6 h-6 bg-green-500 border-2 border-gray-700 rounded-full"></span>}
            </div>

            {/* User Status */}
            <p className={`text-lg font-semibold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>{isOnline ? 'Online' : 'Offline'}</p>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-white mb-2">@{userName}</h2>
            <div className="text-start w-full px-4">
                <p className="text-lg font-semibold text-white break-words mb-1"><span className="text-gray-300">Full Name:</span> {fullName}</p>
                <p className="text-lg font-semibold text-white break-words"><span className="text-gray-300">Gender:</span> {gender}</p>
            </div>
        </div>
    );
};

export default ProfileR;
