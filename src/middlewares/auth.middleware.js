import { findById, findOne } from "../DB/database.repository.js";
import tokenModel from "../DB/models/token.model.js";
import UserModel from "../DB/models/user.model.js";
import { get, revokeTokenKey } from "../DB/redis.service.js";
import { SignatureEnum, TokenTypeEnum } from "../utils/enums/user.enum.js";
import {
  BadRequestExeception,
  ForbiddenExeception,
  NotFoundExeception,
  UnauthorizedExeception,
} from "../utils/error.response.js";
import { getSignature, verifyToken } from "../utils/tokens/token.js";

export const decodedToken = async ({
  authorization,
  tokenType = TokenTypeEnum.Access,
}) => {
  const [Bearer, token] = authorization.split(" ") || [];

  if (!Bearer || !token) {
    throw BadRequestExeception({ message: "invalid Token" });
  }

  let signature = await getSignature({ SignatureLevel: Bearer==="Admin"? SignatureEnum.Admin : SignatureEnum.User });

  const decoded = await verifyToken({
    token,
    secretKey:
      tokenType === TokenTypeEnum.Access
        ? signature.accessSignature
        : signature.refreshSignature,
  });

  //check token is revoked ---- logout from one device 

if(await findOne({model : tokenModel , filter :{jti:decoded.jti} })){
throw UnauthorizedExeception({message : "token is revoked"})
}else{
const isRevoked = await get({key : revokeTokenKey({userId : decoded.id , jti :  decoded.jti})})
if(isRevoked) 
  throw UnauthorizedExeception({message : "token is revoked"})

}
const isRevoked = await get({key : revokeTokenKey({userId : decoded.id , jti :  decoded.jti})})
if(isRevoked) 
  throw UnauthorizedExeception({message : "token is revoked"})



const user = await findById({ model: UserModel, id: decoded.id });
  // console.log(user);
  if(user.changeCredentialsTime?.getTime() ||0 > decoded.iat * 1000)
    throw UnauthorizedExeception({message : "token is expiredkk"})


  if (!user) {
    throw NotFoundExeception({ message: "Not reestird account" });
  }
  return { user, decoded };
};

export const authentication = ({ tokenType = TokenTypeEnum.Access }) => {
  return async (req, res, next) => {
    const { user, decoded } =
      (await decodedToken({
        authorization: req.headers.authorization,
        tokenType,
      })) || {};
    req.user = user;
    req.decoded = decoded;
    return next();
  };
};



export const authorization = ({ accessRole = [] }) => {
  return async (req, res, next) => {
    // console.log(req.user.role);
    
  if (!accessRole.includes(req.user.role)){
    throw ForbiddenExeception({message : "unatorized accesss"})
  }
   return next()

  };
};