import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: [2, "message must be atleast 2 character long"],
      maxLength: [500, "message must not exceed 500 character "],
      trim: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
