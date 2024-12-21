import mongoose from "mongoose"; // Import Mongoose library for MongoDB interaction
import CryptoJS from "crypto-js"; // Import the CryptoJS library for encryption

// Encryption key (make sure to store this securely in environment variables)
const SECRET_KEY = process.env.SECRET_KEY || 'DSxaGPeLw56wMP0iMx5bFAn+ur14VCUmo+UvhmSprE8='; // Store this securely in production

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // senderId is required
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true, // receiverId is required
  },
  encryptedMessage: {
    type: String, // This will store the encrypted message
    required: true, // encryptedMessage is required
  },
}, { timestamps: true });

// Pre-save middleware to encrypt the message before saving it to the database
messageSchema.pre('save', function(next) {
  if (this.isModified('encryptedMessage') || this.isNew) {
    this.encryptedMessage = CryptoJS.AES.encrypt(this.encryptedMessage, SECRET_KEY).toString();
  }
  next();
});

// Method to decrypt the message when fetching it
messageSchema.methods.decryptMessage = function() {
  const bytes = CryptoJS.AES.decrypt(this.encryptedMessage, SECRET_KEY);
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string
  return decryptedMessage;
};

// Create the Message model from the schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
export default Message;
