import { create, find, findById } from "../../DB/database.repository.js";
import MessageModel from "../../DB/models/message.model.js";
import UserModel from "../../DB/models/user.model.js";
import { BadRequestExeception } from "../../utils/error.response.js";

export const sendMessage = async (req, res) => {
  const { receiverId } = req.params;
  const { content } = req.body;

  console.log(receiverId);
  const user = await findById({ model: UserModel, id: receiverId });
  if (!user) throw BadRequestExeception({ message: "user not found" });

  const message = await create({
    model: MessageModel,
    data: [{ content, receiverId: user._id }],
  });
  return res
    .status(201)
    .json({ message: "message sent successfully", data: message });
};

export const getMessage = async (req, res) => {
  const messages = await find({ model: MessageModel, filter: { receiverId: req.user._id } });
  return res
    .status(201)
    .json({ message: "messages retrieved successfully", data: messages });
};
