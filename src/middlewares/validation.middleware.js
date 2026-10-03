import joi from "joi";
import { BadRequestExeception } from "../utils/error.response.js";
import {
  GenderEnum,
  ProviderEnum,
  RoleEnum,
} from "../utils/enums/user.enum.js";

export const generalFields = {
  firstName: joi
    .string()
    .alphanum()
    .min(3)
    .max(25)
    .messages({ "any.requried": "FirstName is  required" }),
  lastName: joi
    .string()
    .alphanum()
    .min(3)
    .max(25)
    .messages({ "any.requried": "LastName is  required" }),
  email: joi
    .string()
    .email({
      minDomainSegments: 1,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "net", "org"] },
    }),
  password: joi.string(),
  confirmPassword: joi.ref("password"),
  age: joi.number().positive().integer(),
  phone: joi.string().pattern(/^01[0125]{1}[0-9]{8}$/),
  id: joi.string().hex().length(24),

  gender: joi.string().valid(...Object.values(GenderEnum)),
  role: joi.string().valid(...Object.values(RoleEnum)),
  provider: joi.string().valid(...Object.values(ProviderEnum)),
  file : {
    fieldname : joi.string() , 
    originalname : joi.string() , 
    encoding : joi.string(),
    mimetype : joi.string() , 
    size : joi.number() , 
    destination :  joi.string() , 
    filename: joi.string(),
    path :  joi.string() , 
    finalPath : joi.string()
  }

};

export const validation = (schema) => {
  return (req, res, next) => {
    //loic of middlware
    const validationError = [];
    for (const key of Object.keys(schema)) {
      const validationResutls = schema[key].validate(req[key], {
        abortEarly: false,
      });
      if (validationResutls.error) {
        validationError.push({ key, details: validationResutls.error.details });
      }
      if (validationError.length)
        throw BadRequestExeception(
          { message: "validationError" },
          validationError,
        );
      return next();
    }
  };
};
