import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const sendMessageValidation = {
  params: joi.object({
    receiverId: generalFields.id.required(),
  }),
  body: joi.object({
    content: joi.string().min(2).max(500).required()
    // .message({
    //   "any.required": "Content is required",
    //   "string.min": "message at least 2 character long",
    //   "string.max": "message must not exceed 500 characters",
    // }),
  }),
};



export const getMessageValidation = {
  params: joi.object({
    receiverId: generalFields.id.required(),
  }),
  body: joi.object({
    content: joi.string().min(2).max(500).required()
    // .message({
    //   "any.required": "Content is required",
    //   "string.min": "message at least 2 character long",
    //   "string.max": "message must not exceed 500 characters",
    // }),
  }),
};

