import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

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
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);

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