import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext';

const ChatNotSelected = () => {
    const { authUser } = useAuthContext();

  return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="px-4 text-center text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
            <p>Welcome <span className="shake-hand">👋</span> {authUser.fullName} ❄️</p>
            <div className="relative inline-block overflow-hidden whitespace-nowrap">
                <span className="inline-block w-full animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white">
                    Select a chat to start messaging
                </span>
            </div>
            <TiMessages className='text-3xl md:text-6xl' />
        </div>
      </div>
  )
};

export default ChatNotSelected;
