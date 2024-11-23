import { useState } from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import Aibot from './ai_bot';

const Sidebar = ({ onOpenAiChat }) => {
    const [selected, setSelected] = useState(null); // Tracks selected item (null, 'AI', or conversation ID)

    const handleSelectAiBot = () => {
        setSelected('AI'); // Mark AI Bot as selected
        onOpenAiChat(); // Trigger action to open AI Bot chat
    };

    const handleSelectConversation = (conversation) => {
        setSelected(conversation._id); // Mark selected conversation
    };

    return (
        <div className="w-full border-r-[1px] border-slate-400 py-4 px-1 flex flex-col">
            <SearchInput />
            <div className="border-b border-slate-400 my-4"></div> {/* Divider */}
            
            {/* AI Bot */}
            <div onClick={handleSelectAiBot} className="cursor-pointer">
                <Aibot isSelected={selected === 'AI'} />
            </div>

            {/* Conversations */}
            <Conversations
                onSelectConversation={handleSelectConversation}
                selectedConversationId={selected}
            />
        </div>
    );
};

export default Sidebar;
