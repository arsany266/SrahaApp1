import UserModel from "../../DB/models/user.model.js";
import { decrypt } from "../../utils/security/encryption.security.js";
import { successRespone } from "../../utils/success.respone.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../utils/tokens/token.js";
import {
  findById,
  findByIdAndUpdate,
  findOneAndDelete,
  findOneAndUpdate,
  updateOne,
} from "../../DB/database.repository.js";
import {
  BadRequestExeception,
  ConflictExeception,
  ForbiddenExeception,
  UnauthorizedExeception,
} from "../../utils/error.response.js";
import {
  compareHash,
  generateHash,
} from "../../utils/security/hash.security.js";
import { RoleEnum } from "../../utils/enums/user.enum.js";

export const etPrifle = async (req, res) => {
  req.user.phone = await decrypt(req.user.phone);
  return successRespone({
    res,
    message: "done",
    data: req.user,
    statusCode: 200,
  });
};

export const updateProfile = async (req, res) => {
  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: { profilePic: req.file.finalPath },
  });
  return successRespone({
    res,
    message: "done",
    data: { user },
    statusCode: 200,
  });
};

export const updateCover = async (req, res) => {
  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: { coverImaes: req.files?.map((file) => file.finalPath) },
  });
  return successRespone({
    res,
    message: "done",
    data: { user },
    statusCode: 200,
  });
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isValidPassword = await compareHash(oldPassword, req.user.password);
  if (!isValidPassword)
    throw BadRequestExeception({ message: "invalid password" });

  if (newPassword !== confirmPassword)
    throw ConflictExeception({
      message: "password and confirm password does not match",
    });

  const user = await findById({ model: UserModel, id: req.user._id });
  if (!user) throw BadRequestExeception({ message: "user Not Found" });

  const hashedPassword = await generateHash(newPassword);
  await updateOne({
    model: UserModel,
    filter: { _id: user._id },
    update: { password: hashedPassword },
  });

  return successRespone({
    res,
    message: "password updated successfully",
    statusCode: 200,
  });
};

export const freezAccount = async (req, res) => {
  const { userId } = req.params;
  //check
  if (userId && req.user.role !== RoleEnum.Admin)
    throw ForbiddenExeception({
      message: "you are not authorized to freeze Account ",
    });

  const updatedUser = await findOneAndUpdate({
    model: UserModel,
    filter: { _id: userId || req.user._id, freezedAt: { $exists: false } },
    update: {
      freezedAt: Date.now(),
      freezedBy: req.user._id,
      $unset: {
        restoredBy: true,
        restoredAt: true,
      },
    },
  });

  if (!updatedUser) throw BadRequestExeception({ message: "user not found" });

  return successRespone({
    res,
    message: "Account freezed successfully",
    statusCode: 200,
    data: { updatedUser },
  });
};

export const restorAccount = async (req, res) => {
  const { userId } = req.params;
  //check

  const updatedUser = await findOneAndUpdate({
    model: UserModel,
    filter: {
      _id: userId,
      freezedAt: { $exists: true },
      freezedBy: { $ne: userId },
      restoredAt: { $exists: false },
    },
    update: {
      restoredAt: Date.now(),
      restoredBy: req.user._id,
      $unset: {
        freezedAt: true,
        freezedBy: true,
      },
    },
  });

  if (!updatedUser) throw BadRequestExeception({ message: "user not found" });

  return successRespone({
    res,
    message: "Account restored successfully",
    statusCode: 200,
    data: { updatedUser },
  });
};


export const hardDelete = async (req, res) => {
  const { userId } = req.params;
  //check

  const deletedUser = await findOneAndDelete({
    model: UserModel,
    filter: {
      _id: userId,
    },
  });

  if (!deletedUser) throw BadRequestExeception({ message: "user not found" });

  return successRespone({
    res,
    message: "Account deleted successfully",
    statusCode: 200,
  });
};
