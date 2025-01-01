import { useState, useRef, useEffect } from 'react';
import { BsSend, BsEmojiSmile, BsImage } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = ({ inputRef }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { loading, sendMessage } = useSendMessage();
    const emojiPickerRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !selectedImage) return;
        await sendMessage(message, selectedImage);
        setMessage("");
        setSelectedImage(null);
        setShowEmojiPicker(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelImage = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker, inputRef]);

    return (
        <div className="relative">
            <form className="px-4 py-2" onSubmit={handleSubmit}>
                <div className="relative flex items-center space-x-3">
                    {/* Message Input Box */}
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            className="border border-gray-700 bg-gray-800 text-white rounded-lg p-3 pl-14 pr-14 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transform transition-all duration-300"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {/* Emoji Icon inside input */}
                        <button
                            type="button"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                            onClick={() => setShowEmojiPicker(prev => !prev)}
                        >
                            <BsEmojiSmile size={20} />
                        </button>
                    </div>

                    {/* Image Upload Button (Between Input and Send Button) */}
                    {/* <button
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full transform hover:scale-110 transition-all duration-300"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <BsImage size={20} />
                    </button> */}
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />

                    {/* Send Button */}
                    <button
                        type="submit"
                        className={`text-white bg-sky-600 hover:bg-sky-400 p-3 rounded-full ${loading ? 'opacity-50' : ''} transform hover:scale-110 transition-all duration-300`}
                    >
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend size={20} />}
                    </button>
                </div>
            </form>

            {/* Emoji Picker */}
            {showEmojiPicker && (
                <div
                    ref={emojiPickerRef}
                    className="absolute bottom-14 left-0 z-50 transition-opacity opacity-0 animate-fadeIn"
                    style={{ backgroundColor: '#1D232A', width: '300px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
                >
                    {/* Close button at the top right of emoji picker */}
                    <button
                        type="button"
                        className="absolute top-2 right-2 text-white text-xl"
                        onClick={() => setShowEmojiPicker(false)}
                    >
                        &times;
                    </button>
                    <Picker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
            )}

            {/* Image Preview
            {selectedImage && (
                <div className="absolute bottom-16 left-0 z-50 bg-gray-700 p-2 rounded-lg shadow-lg transition-all transform hover:scale-105">
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Selected Preview"
                            className="max-w-[200px] max-h-[200px] object-cover rounded-lg border-2 border-gray-500"
                        />
                        <button
                            type="button"
                            className="absolute top-0 right-0 text-white bg-gray-600 rounded-full p-1"
                            onClick={handleCancelImage}
                        >
                            X
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default MessageInput;
