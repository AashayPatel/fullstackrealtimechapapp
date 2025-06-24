import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            trim: true,
        },
            image: {
            type: String,
        },

        // ✅ NEW FIELDS TO ADD:
        
        messageType: {
            type: String,
            enum: ["text", "image", "file", "system", "reply", "reaction"],
            default: "text",
        },

        isEdited: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },

        reactions: [
        {
            emoji: String,
            userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        },
        ],

        attachments: [
        {
            url: String,
            fileType: String,
            fileName: String,
        },
        ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;