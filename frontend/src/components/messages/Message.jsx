import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import useDeleteMessage from '../../hooks/useDeleteMessage';
import toast from 'react-hot-toast';
import { MdDelete, MdContentCopy } from "react-icons/md";

// Regular expression to match URLs
const urlRegex = /(https?:\/\/[^\s]+)/g;

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation, setMessages, messages } = useConversation();
    const { loading, deleteMessage } = useDeleteMessage();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || 'defaultProfilePic.png';
    const bubbleBgColor = fromMe ? "bg-blue-500 sendanimation" : "bg-gray-500 receiveranimation";

    const handleDelete = async () => {
        try {
            await deleteMessage(message._id);
            setMessages(messages.filter(msg => msg._id !== message._id));
            toast.success('Message deleted successfully');
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(message.message)
            .then(() => {
                toast.success('Message copied to clipboard');
            })
            .catch(() => {
                toast.error('Failed to copy message');
            });
    };

    // Function to convert plain text to clickable links
    const formatMessageWithLinks = (msg) => {
        const parts = msg.split(urlRegex); // Split the message into parts
        return parts.map((part, index) => {
            // If the part matches the URL regex, return an anchor tag
            if (urlRegex.test(part)) {
                return (
                    <a 
                        key={index} 
                        href={part} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#FFFFFF] hover:text-gray-100 hover:underline  font-semibold cursor-pointer"
                    >
                        {part}
                    </a>
                );
            }
            // Otherwise, return the text part
            return <span key={index} className="text-white">{part}</span>;
        });
    };

    return (
        <div className={`chat ${chatClassName} overflow-x-hidden`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="Profile" />
                </div>
            </div>
            <div className="message-container flex items-center">
                {fromMe && (
                    <div className="action-buttons flex mr-2">
                        <button 
                            onClick={handleDelete} 
                            disabled={loading} 
                            className="delete-button text-xs text-[#e8edf1] mr-2"
                            title="Delete Message"
                        >
                            <MdDelete />
                        </button>
                        <button 
                            onClick={handleCopy} 
                            className="copy-button text-xs text-[#e8edf1]"
                            title="Copy Message"
                        >
                            <MdContentCopy />
                        </button>
                    </div>
                )}
                <div className={`chat-bubble ${bubbleBgColor} pb-2 max-w-[90%]`}>
                    <div className="overflow-hidden whitespace-normal break-words max-w-full">
                        {/* Format message with clickable links */}
                        {formatMessageWithLinks(message.message)}
                    </div>
                </div>
            </div>
            <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formattedTime}</div>
        </div>
    );
};




export default Message;

