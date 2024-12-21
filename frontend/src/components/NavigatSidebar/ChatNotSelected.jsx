import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext';
import MessageAnimation from "../../assets/GIF/animation.gif";

const ChatNotSelected = () => {
    const { authUser } = useAuthContext();

  return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="px-4 text-center text-xl md:text-2xl text-gray-200 font-semibold flex flex-col items-center ">
            <p>Welcome <span className="shake-hand">👋</span> {authUser.fullName} ❄️</p>
            <div className="relative inline-block overflow-hidden whitespace-nowrap">
                <span className="inline-block w-full animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white">
                    Select a chat to start messaging
                </span>
            </div>
            <div className="w-11 sm:w-16 md:w-20 lg:w-24 xl:w-28 m-[-10px]">
                <img src={MessageAnimation} alt="Message animation" className="w-full h-auto" />
            </div>
        </div>
      </div>
  );
};

export default ChatNotSelected;
