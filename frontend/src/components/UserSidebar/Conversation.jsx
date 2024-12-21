import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation  } = useConversation();
    const { onlineUsers } = useSocketContext();

    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div
                className={`flex items-center  gap-2 p-2 rounded cursor-pointer hover:bg-sky-500 ${
                    isSelected ? "bg-sky-500" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)} // Select conversation
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src={conversation.profilePic || "/default-avatar.png"}
                            alt="user avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-200">{conversation.fullName || "Unknown User"}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>
            {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
        </>
    );
};

export default Conversation;
