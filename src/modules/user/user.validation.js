import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";
import { fileValidation } from "../../utils/multer/local.multer.js";

export const updateProfilePicSchema = {
  file: joi
    .object({
      fieldname: generalFields.file.fieldname.valid("attachments").required(),
      originalname: generalFields.file.originalname.required(),
      mimetype: generalFields.file.mimetype
        .valid(...fileValidation.images)
        .required(),
      size: generalFields.file.size.max(5 * 1024 * 1024).required(), // max 5MB
      path: generalFields.file.path.required(),
      destination: generalFields.file.destination.required(),
      filename: generalFields.file.filename.required(),
      encoding: generalFields.file.encoding.required(),
      finalPath: generalFields.file.finalPath.required(),
    })
    .required(),
};

export const coverImagesValidation = {
  files: joi
    .object({
      fieldname: generalFields.file.fieldname.valid("attachments").required(),
      originalname: generalFields.file.originalname.required(),
      mimetype: generalFields.file.mimetype
        .valid(...fileValidation.images)
        .required(),
      size: generalFields.file.size.max(5 * 1024 * 1024).required(), // max 5MB
      path: generalFields.file.path.required(),
      destination: generalFields.file.destination.required(),
      filename: generalFields.file.fieldname.required(),
      encoding: generalFields.file.encoding.required(),
      finalPath: generalFields.file.finalPath.required(),
    })
    .required(),
};

export const updatePaswwordSchema = {
  body:joi.object(
    {
      oldPassword: generalFields.password.required(),
      newPassword: generalFields.password.required(),
      confirmPassword:generalFields.password.required(),
    }
  ) 
};

export const freezeAccountSchema = {
  params:joi.object(
    {
      userId: generalFields.id
    }
  ) 
};

export const RestoreAccountSchema = {
  params:joi.object(
    {
      userId: generalFields.id
    }
  ) 
};

export const hardDeleteAccountSchema = {
  params:joi.object(
    {
      userId: generalFields.id
    }
  ) 
};





