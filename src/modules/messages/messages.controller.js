import { Router } from "express";
import * as messageService from "./messages.service.js";
import * as messageValidation from "./messages.validation.js";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  authentication,
  authorization,
} from "../../middlewares/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../utils/enums/user.enum.js";

const router = Router();
//send message
router.post(
  "/send-message/:receiverId",
  validation(messageValidation.sendMessageValidation),
  messageService.sendMessage,
);

router.get(
  "/get-message",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.User] }),
  messageService.getMessage,
);

export default router;
