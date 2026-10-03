import { Router } from "express";
import * as authServie from "./auth.service.js"
import { validation } from "../../middlewares/validation.middleware.js";
import * as authSValidation from "./auth.validation.js"
import { authentication } from "../../middlewares/auth.middleware.js";
import { TokenTypeEnum } from "../../utils/enums/user.enum.js";

const router = Router()

router.post("/signup" ,validation(authSValidation.signupSchema) , authServie.signup)
router.post("/confirm-email" ,validation(authSValidation.ConfirmEmailSchema) ,  authServie.confirmEmail)
router.post("/foreget-password" , validation(authSValidation.forgetPasswordSchema) ,authServie.foretPassword)
router.post("/reset-Password" , validation(authSValidation.resetPasswordSchema) ,authServie.resetPassword)


router.post("/login" ,validation(authSValidation.loinSchema), authServie.login)
router.post("/refresh-token" , authServie.refreshToken)
router.post("/social-login" , authServie.loginWithgoogle)
router.post("/logOut" ,authentication({tokenType : TokenTypeEnum.Access }) ,authServie.logout)
router.post("/logOut-redis" ,authentication({tokenType : TokenTypeEnum.Access }) ,authServie.logoutWithRedis)
export default router




