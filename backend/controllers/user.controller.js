import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUserProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const profilePicPath = req.file.path; // Path where multer saved the file

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profilePic: profilePicPath },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, profilePic: updatedUser.profilePic });
    } catch (error) {
        console.error('Error updating profile picture:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
