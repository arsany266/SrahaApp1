import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const signupSchema = {
  body: joi.object({
    firstName: generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: joi.ref("password"),
    age: joi.number().positive().integer(),
    phone: joi.string().pattern(/^01[0125]{1}[0-9]{8}$/),
  }),
  params: joi.object({}),
  query: joi.object({}),
};
export const loinSchema = {
  body: joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }),
};

export const ConfirmEmailSchema = {
  body: joi.object({
    email: generalFields.email.required(),
    otp: generalFields.password.required(),
  }),
};

export const forgetPasswordSchema = {
  body: joi.object({
    email: generalFields.email.required(),
  }),
};

export const resetPasswordSchema = {
  body: joi.object({
    email: generalFields.email.required(),
    newpassword: generalFields.password.required(),
    confirmNewPassword: generalFields.password.required(),
    otp: generalFields.password.required(),
  }),
};
