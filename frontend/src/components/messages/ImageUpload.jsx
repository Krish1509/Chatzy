// ImageUpload.jsx
import { useState } from 'react';
import { MdImage, MdClose } from 'react-icons/md';

const ImageUpload = ({ onImageSelect, onCancelImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            onImageSelect(file);
        }
    };

    const handleCancelImage = () => {
        setSelectedImage(null);
        onCancelImage();
    };

    return (
        <div className="relative flex items-center">
            {!selectedImage ? (
                <label className="cursor-pointer text-white">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <MdImage className="text-2xl" />
                </label>
            ) : (
                <div className="flex items-center gap-2">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded-md border border-gray-400"
                    />
                    <button
                        onClick={handleCancelImage}
                        className="text-red-500 hover:text-red-600"
                    >
                        <MdClose className="text-xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
