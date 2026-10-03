import jwt from "jsonwebtoken";
import {
  ACCESS_EXPIRES,
  REFRSH_EXPIRES,
  TOKEN_ACCESS_ADMIN_SECRET_KEY,
  TOKEN_ACCESS_USER_SECRET_KEY,
  TOKEN_REFRESH_ADMIN_SECRET_KEY,
  TOKEN_REFRESH_USER_SECRET_KEY,
} from "../../../config/confi.service.js";
import { RoleEnum, SignatureEnum } from "../enums/user.enum.js";
import { v4 as uuidv4 } from 'uuid';

export const generateToken = ({
  payload,
  secretKey,
  options = { expiresIn: ACCESS_EXPIRES },
}) => {
  return jwt.sign(payload, secretKey, options);
};


export const verifyToken = async ({ token, secretKey }) => {
  return await jwt.verify(token, secretKey);
};

export const getSignature = ({ SignatureLevel = SignatureEnum.user }) => {
  let Signature = { accessSignature: undefined, refreshSignature: undefined };
  switch (SignatureLevel) {
    case SignatureEnum.Admin:
      Signature.accessSignature = TOKEN_ACCESS_ADMIN_SECRET_KEY;
      Signature.refreshSignature = TOKEN_REFRESH_ADMIN_SECRET_KEY;
      break;
    case SignatureEnum.user:
      Signature.accessSignature = TOKEN_ACCESS_USER_SECRET_KEY;
      Signature.refreshSignature = TOKEN_REFRESH_USER_SECRET_KEY;
      break;
    default:
      Signature.accessSignature = TOKEN_ACCESS_USER_SECRET_KEY;
      Signature.refreshSignature = TOKEN_REFRESH_USER_SECRET_KEY;
  }
  return Signature;
};

export const getNewLoginCredientials = async (user) => {
  const Signature = await getSignature({
    SignatureLevel:
      user.role != RoleEnum.Admin ? SignatureEnum.user : SignatureEnum.Admin,
  });

  const accessToken = generateToken({
    payload: { id: user._id },
    secretKey: Signature.accessSignature,
    options: { expiresIn: ACCESS_EXPIRES , jwtid : uuidv4()  },
  });

  const refreshToken = generateToken({
    payload: { id: user._id },
    secretKey: Signature.refreshSignature,
    options: { expiresIn: REFRSH_EXPIRES  , jwtid : uuidv4()},
  });

  return { accessToken, refreshToken };
};
