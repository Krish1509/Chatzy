import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/uploadMiddleware.js';
import { getUsersForSidebar, updateUserProfilePic } from "../controllers/user.controller.js"; // Import the controller function
const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);

// Add multer middleware for file upload
router.post('/update-profile', protectRoute, upload.single('profilePic'), updateUserProfilePic);

export default router;
