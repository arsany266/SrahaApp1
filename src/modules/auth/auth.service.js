import {
  revokeTokenKey,
  revokeTokenKeyPrefix,
} from "../../DB/redis.service.js";
import {
  ACCESS_EXPIRES,
  CLIENT_ID,
  REFRSH_EXPIRES,
} from "../../../config/confi.service.js";
import {
  create,
  findById,
  findOne,
  findOneAndUpdate,
  updateOne,
} from "../../DB/database.repository.js";
import tokenModel from "../../DB/models/token.model.js";
import UserModel from "../../DB/models/user.model.js";
import { set } from "../../DB/redis.service.js";
import { LogoutTypeEnum, ProviderEnum } from "../../utils/enums/user.enum.js";
import {
  BadRequestExeception,
  ConflictExeception,
  NotFoundExeception,
} from "../../utils/error.response.js";
import { encrypt } from "../../utils/security/encryption.security.js";
import {
  compareHash,
  generateHash,
} from "../../utils/security/hash.security.js";
import { successRespone } from "../../utils/success.respone.js";
import {
  generateToken,
  getNewLoginCredientials,
  verifyToken,
} from "../../utils/tokens/token.js";
import { OAuth2Client } from "google-auth-library";
import { emailSubject, sendEmail } from "../../utils/email/email.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { emailEvent } from "../../utils/events/email.event.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const user = await findOne({ model: UserModel, filter: { email } });
  if (user) throw ConflictExeception({ message: "user already exist" });
  const hashedPassword = await generateHash(password);
  const encryptedPhone = await encrypt(phone);
  //create otp of 6 didits----by nano Id library ----

  const otp = generateOtp();

  const hashedOtp = await generateHash(String(otp));

  const user_1 = await create({
    model: UserModel,
    data: [
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: encryptedPhone,
        confirmEmailOtp: hashedOtp,
      },
    ],
  });

  // send otp of length g digits unique [******]
  //call event
  emailEvent.emit("confirmEmail", { to: email, otp, firstName });

  return successRespone({
    res,
    statusCode: 201,
    message: "User created successfuly",
    data: { user_1 },
  });
};

export const confirmEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: {
      email,
      confirmEmail: { $exists: false },
      confirmEmailOtp: { $exists: true },
    },
  });
  if (!user) throw NotFoundExeception({ message: "user not found" });

  const isOtpValid = await compareHash(otp, user.confirmEmailOtp);
  if (!isOtpValid) {
    throw BadRequestExeception({ message: "invalid otp " });
  }

  //update user
  await updateOne({
    model: UserModel,
    filter: { email },
    update: { confirmEmail: Date.now(), $unset: { confirmEmailOtp: true } },
  });

  return successRespone({
    res,
    statusCode: 200,
    message: "email confirmed successfully",
  });
};

export const foretPassword = async (req, res) => {
  const { email } = req.body;
  //generate otp
  const otp = generateOtp();

  const haashedOtp = await generateHash(String(otp));

  const user = await findOneAndUpdate({
    model: UserModel,
    filter: {
      email,
      provider: ProviderEnum.system,
      confirmEmail: { $exists: true },
    },
    update: { forgetPasswordOtp: haashedOtp },
  });

  if (!user) throw NotFoundExeception({ message: "user not found" });

  emailEvent.emit("ForgetPassword", {
    to: email,
    otp,
    firstName: user.firstName,
  });

  return successRespone({
    res,
    statusCode: 200,
    message: "email sent successfully",
  });
};

export const resetPassword = async (req, res) => {
  const { email, newpassword, confirmNewPassword, otp } = req.body;

  const hashedPassword = await generateHash(newpassword);
  if (newpassword !== confirmNewPassword)
    throw ConflictExeception({
      message: "password and confirm password does not match",
    });

  const user = await findOne({
    model: UserModel,
    filter: {
      email,
      provider: ProviderEnum.system,
      // confirmEmail: { $exists: true },
      forgetPasswordOtp: { $exists: true },
    },
  });
  if (!user) throw NotFoundExeception({ message: "user not found" });

  const isOtpValid = await compareHash(otp, user.forgetPasswordOtp);
  if (!isOtpValid) {
    throw BadRequestExeception({ message: "invalid otp " });
  }

  await updateOne({
    model: UserModel,
    filter: { email },
    update: {
      confirmEmail: Date.now(),
      $unset: { forgetPasswordOtp: true },
      password: hashedPassword,
    },
  });

  return successRespone({
    res,
    statusCode: 200,
    message: "password reset successfully",
  });
};





export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne({
    model: UserModel,
    filter: { email, confirmEmail: { $exists: true } },
  });
  if (!user) {
    throw NotFoundExeception({ message: "user not found" });
  }
  const isMatced = await compareHash(password, user.password);
  if (!isMatced) {
    throw NotFoundExeception({ message: "user not found" });
  }

  const Credientials = await getNewLoginCredientials(user);

  // const accessToken = jwt.sign(
  //   { id: user._id, email: user.email },
  //   TOKEN_ACCESS_SECRET_KEY,
  //   {
  //     expiresIn: ACCESS_EXPIRES,
  //     issuer: "http://localhost:3000",
  //     audience: "http://localhost:4111",
  //   },
  // );
  return successRespone({
    res,
    statusCode: 200,
    message: "login successfully",
    data: { Credientials },
  });
};

export const refreshToken = async (req, res) => {
  const { authorization } = req.headers;

  const decodedToken = await verifyToken({ token: authorization, secretKey });
  // console.log(decodedToken);
  const user = await findById({ model: UserModel, id: decodedToken.id });
  if (!user) {
    throw NotFoundExeception({ message: "user not found" });
  }

  const accessToken = generateToken({
    payload: { id: user._id, email: user.email },
    secretKey,
    options: {
      expiresIn: ACCESS_EXPIRES,
      issuer: "http://localhost:3000",
      audience: "http://localhost:4111",
    },
  });

  return successRespone({
    res,
    statusCode: 200,
    message: "Token Refresh successfully",
    data: { accessToken },
  });
};

async function verifyooleAccount({ idToken }) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

export const loginWithgoogle = async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log("jfjj", idToken);
    const { email, picture, given_name, family_name, email_verified } =
      await verifyooleAccount(idToken);

    //loic

    if (!email_verified)
      throw BadRequestExeception({ message: "email not verfied" });

    const user = await findOne({ model: UserModel, filter: { email } });

    if (user) {
      if (user.provider === ProviderEnum.google) {
        const credemtials = await getNewLoginCredientials(user);

        return successRespone({
          res,
          statusCode: 200,
          message: "Loin Successfully",
          data: { credemtials },
        });
      }
    }

    //create_user

    const newUser = await create({
      model: UserModel,
      data: {
        firstName: given_name,
        lastName: family_name,
        email,
        profilePic: picture,
        provider: ProviderEnum.google,
      },
    });

    const credemtials = await getNewLoginCredientials(newUser);

    return successRespone({
      res,
      statusCode: 201,
      message: "Loin  Successfully",
      data: { credemtials },
    });
  } catch (error) {
    console.log("error", error);
    return (
      res.status(500),
      json({ message: "internal ", error: error.message, dtsck: error.stack })
    );
  }
};

//logout with ttl of monoDB
export const logout = async (req, res) => {
  const { flag } = req.body;
  let status = 200;
  switch (flag) {
    case LogoutTypeEnum.logout:
      await create({
        model: tokenModel,
        data: [
          {
            jti: req.decoded.jti,
            userId: req.user._id,
            expiresIn: Date.now() - req.decoded.exp,
          },
        ],
      });
      status = 201;
    case LogoutTypeEnum.logoutFromAll:
      await updateOne({
        model: UserModel,
        filter: { _id: req.user._id },
        update: { changeCredentialsTime: Date.now() },
      });
      status = 200;
  }

  return successRespone({
    res,
    statusCode: status,
    message: "LogOut successfuly",
  });
};

//logoutWithRedis
export const logoutWithRedis = async (req, res) => {
  const { flag } = req.body;

  let status = 200;
  switch (flag) {
    case LogoutTypeEnum.logout:
      await set({
        key: revokeTokenKey({ userId: req.user._id, jti: req.decoded.jti }),
        value: req.decoded.jti,
        ttl: req.decoded.iat + ACCESS_EXPIRES,
      });
      status = 201;
    case LogoutTypeEnum.logoutFromAll:
      await updateOne({
        model: UserModel,
        filter: { _id: req.user._id },
        update: { changeCredentialsTime: Date.now() },
      });
      status = 200;
  }

  return successRespone({
    res,
    statusCode: status,
    message: "LogOut successfuly",
  });
};
