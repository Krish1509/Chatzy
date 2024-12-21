import mongoose from 'mongoose'; // Import Mongoose library for MongoDB interaction

// Define the schema for the Conversation model
const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, // Data type for participants is an array of ObjectIds
            ref: 'User', // Reference to the User model
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, // Data type for messages is an array of ObjectIds
            ref: 'Message', // Reference to the Message model
            default: [], // Default value is an empty array
        }
    ]
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the Conversation model from the schema
const Conversation = mongoose.model("Conversation", conversationSchema);

// Export the Conversation model
export default Conversation;
