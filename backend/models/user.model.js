import mongoose from "mongoose"; // Import Mongoose library for MongoDB interaction

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    fullName: {
        type: String, // Data type for fullName is String
        required: true // fullName is required
    },
    username: {
        type: String, // Data type for username is String
        required: true, // username is required
        unique: true // username must be unique
    },
    password: {
        type: String, // Data type for password is String
        required: true, // password is required
        minlength: 6 // password must be at least 6 characters long
    },
    gender: {
        type: String, // Data type for gender is String
        required: true, // gender is required
        enum: ["male", "female"] // gender must be either "male" or "female"
    },
    pprofilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
