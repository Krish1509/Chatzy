import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Plain message from the request body
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Encrypt the message content before saving it
    const newMessage = new Message({
      senderId,
      receiverId,
      encryptedMessage: message, // Save the plain message as encrypted
    });

    // Push the new message ID to the conversation messages array
    conversation.messages.push(newMessage._id);

    // Save the message and conversation
    await Promise.all([conversation.save(), newMessage.save()]);

    // Get the receiver's socket ID for real-time notification
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Emit the new message event with the decrypted message
      io.to(receiverSocketId).emit("newMessage", {
        ...newMessage.toObject(),
        message: newMessage.decryptMessage(), // Decrypt for real-time notification
      });
    }

    res.status(201).json(newMessage); // Return the new message response
  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]); // No messages found

    // Decrypt each message before returning it
    const messages = conversation.messages.map((msg) => ({
      ...msg.toObject(),
      message: msg.decryptMessage(), // Decrypt the message
    }));

    res.status(200).json(messages); // Return decrypted messages
  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
  



export const deleteMessage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Ensure req.user is defined
      if (!req.user || !req.user._id) {
        return res.status(400).json({ error: 'Invalid request, user not authenticated' });
      }
  
      const senderId = req.user._id;
  
      console.log(`Attempting to delete message with ID: ${id} by user: ${senderId}`);
  
      // Find the message to be deleted
      const messageToDelete = await Message.findById(id);
      if (!messageToDelete) {
        console.log(`Message with ID: ${id} not found`);
        return res.status(404).json({ error: 'Message not found' });
      }
  
      console.log(`Message found: ${messageToDelete}`);
      console.log(`Message sender ID: ${messageToDelete.senderId}`);
      console.log(`Request user ID: ${senderId}`);
  
      // Check if the sender is the same as the user trying to delete the message
      if (messageToDelete.senderId.toString() !== senderId.toString()) {
        console.log(`Unauthorized action by user: ${senderId} for message: ${messageToDelete._id}`);
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      // Remove the message
      await Message.findByIdAndDelete(id);
      console.log(`Message with ID: ${id} removed successfully`);
  
      // Find the conversation and remove the message reference from it
      const conversation = await Conversation.findOneAndUpdate(
        { participants: { $all: [senderId, messageToDelete.receiverId] } },
        { $pull: { messages: id } },
        { new: true } // Ensure the updated document is returned
      );
  
      // Check if the conversation was updated
      if (!conversation) {
        console.log(`Conversation involving users: ${senderId} and ${messageToDelete.receiverId} not found`);
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      console.log(`Message reference removed from conversation: ${conversation._id}`);
  
      // Emit the event to notify clients
      io.emit('messageDeleted', { messageId: id });
  
      res.status(200).json({ message: 'Message deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };