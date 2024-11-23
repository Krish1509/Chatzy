import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = ({ onSelectConversation, selectedConversationId }) => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="py-2 flex flex-col flex-1 overflow-auto">
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    onSelectConversation={onSelectConversation}
                    isSelected={selectedConversationId === conversation._id}
                    lastIdx={idx === conversations.length - 1}
                    emoji={getRandomEmoji()}
                />
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};

export default Conversations;

