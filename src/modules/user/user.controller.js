import { Router } from "express";
import * as userService from "./user.service.js";
import {
  authentication,
  authorization,
} from "../../middlewares/auth.middleware.js";
import { RoleEnum, TokenTypeEnum } from "../../utils/enums/user.enum.js";
import {
  fileValidation,
  localFileUpload,
} from "../../utils/multer/local.multer.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as UserValidation from "./user.validation.js";

const router = Router();
router.get(
  "/:id",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin, RoleEnum.user] }),
  userService.etPrifle,
);

router.patch(
  "/profile-pic",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin, RoleEnum.user] }),
  localFileUpload({
    customPath: "users",
    validation: [...fileValidation.images],
  }).single("file"),
  validation(UserValidation.updateProfilePicSchema),
  userService.updateProfile,
);

router.patch(
  "/covers-pic",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin, RoleEnum.user] }),
  localFileUpload({
    customPath: "users",
    validation: [...fileValidation.images],
  }).array("file", 5),
  userService.updateCover,
);

router.patch(
  "/update-password",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin, RoleEnum.user] }),
    validation(UserValidation.updatePaswwordSchema),
  userService.updatePassword,
);




//user 
//admin
router.delete(
  "{/:userId}/freeze-account",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin, RoleEnum.user] }),
    validation(UserValidation.freezeAccountSchema),
  userService.freezAccount,
);

//restore user by admin
router.patch(
  "/:userId/restore-account",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin] }),
    validation(UserValidation.RestoreAccountSchema),
  userService.restorAccount
);


//hard Delete 
router.delete(
  "/:userId/hard-Delete",
  authentication({ tokenType: TokenTypeEnum.Access }),
  authorization({ accessRole: [RoleEnum.Admin] }),
    validation(UserValidation.hardDeleteAccountSchema),
  userService.hardDelete
);




export default router;
