import mongoose from "mongoose"; // Import Mongoose library for MongoDB interaction

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Data type for senderId is ObjectId
        ref: "User", // Reference to the User model
        required: true // senderId is required
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // Data type for receiverId is ObjectId
        ref: "User", // Reference to the User model
        required: true // receiverId is required
    },
    message: {
        type: String, // Data type for message is String
        required: true // message is required
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the Message model from the schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
export default Message;
