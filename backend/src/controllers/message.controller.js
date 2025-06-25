import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"; 
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error"});    
    }
};

export const getMessages = async(req, res) => {
    try {
        const { id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error"});    
    }
};

export const sendMessage = async(req, res) => {
    try {
        const { text, image, replyTo } = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            messageType: image ? "image" : replyTo ? "reply" : "text",
            replyTo: replyTo || null,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage); 
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

export const editMessage = async (req, res) => {
  try {
    const { id } = req.params;  // Changed from messageId to id
    const { text } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(id);  // Changed from messageId to id
    if (!message) return res.status(404).json({ error: "Message not found" });
    if (!message.senderId.equals(userId)) return res.status(403).json({ error: "Unauthorized" });

    message.text = text;
    message.isEdited = true;

    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.error("Edit message error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;  // Changed from messageId to id
    const userId = req.user._id;

    const message = await Message.findById(id);  // Changed from messageId to id
    if (!message) return res.status(404).json({ error: "Message not found" });
    if (!message.senderId.equals(userId)) return res.status(403).json({ error: "Unauthorized" });

    message.isDeleted = true;
    message.text = "";
    message.image = "";

    await message.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const reactToMessage = async (req, res) => {
  try {
    const { id } = req.params;  // Changed from messageId to id
    const { emoji } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(id);  // Changed from messageId to id
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Remove existing reaction by same user
    message.reactions = message.reactions.filter(r => !r.userId.equals(userId));

    // Add new reaction
    message.reactions.push({ emoji, userId });

    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.error("React to message error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};