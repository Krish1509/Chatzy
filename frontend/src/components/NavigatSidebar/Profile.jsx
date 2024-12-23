import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const [previewPic, setPreviewPic] = useState(authUser?.profilePic || "defaultProfilePic.png");
    const [uploadedPic, setUploadedPic] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Loading state

    const isOnline = authUser && onlineUsers.includes(authUser._id);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setUploadedPic(file); // Save the file for upload
            const reader = new FileReader();
            reader.onloadend = () => setPreviewPic(reader.result); // Preview the image
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleSaveProfilePic = async () => {
        if (!uploadedPic) {
            alert("No image selected for upload.");
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", uploadedPic);

        try {
            setIsUploading(true); // Set loading state
            const response = await fetch("/api/users/update-profile", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authUser.token}`, // Pass the JWT token
                },
                body: formData, // Send as multipart/form-data
            });

            const result = await response.json();

            if (result.success) {
                setAuthUser((prev) => ({ ...prev, profilePic: result.profilePic })); // Update profile picture in context
                alert("Profile picture updated successfully!");
            } else {
                alert(result.error || "Failed to update profile picture.");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsUploading(false); // Reset loading state
        }
    };

    return (
        <div className="relative flex flex-col items-center p-6 bg-gradient-to-b from-[#1C1C1E] to-[#2C3E50] rounded-lg max-w-sm mx-auto border-[3px] border-gray-700 shadow-xl">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-sm text-gray-400 mb-6">Your profile information</p>
            <div className="relative w-28 h-28 mb-6">
                <div
                    className={`absolute inset-0 rounded-full ${
                        isOnline ? "border-[4px] border-green-500" : "border-[6px] border-gray-700"
                    }`}
                >
                    <img src={previewPic} alt="Profile" className="w-full h-full object-cover rounded-full z-10" />
                </div>
                <label
                    htmlFor="profile-image-upload"
                    className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer z-30 hover:bg-gray-700 transition"
                >
                    <FaCamera className="text-white text-sm" />
                </label>
                <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
            {uploadedPic && !isUploading && (
                <button
                    onClick={handleSaveProfilePic}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
                >
                    Upload
                </button>
            )}
            {isUploading && <p className="text-gray-400">Uploading...</p>}
            <hr className="w-3/4 border-gray-600 mb-6" />
            <div className="text-center text-white space-y-4">
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-gray-400 font-semibold">Username:</span>
                    <p className="text-lg font-medium">@{authUser?.username || "Username"}</p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-gray-400 font-semibold">Full Name:</span>
                    <p className="text-lg font-medium">{authUser?.fullName || "Full Name"}</p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-gray-400 font-semibold">Gender:</span>
                    <p className="text-lg font-medium">{authUser?.gender || "Gender"}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
