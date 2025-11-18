"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .route('/profile')
    .get((0, auth_1.default)(user_1.USER_ROLES.ADMIN, user_1.USER_ROLES.ARTIST, user_1.USER_ROLES.INVESTOR), user_controller_1.UserController.getUserProfile)
    .patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN, user_1.USER_ROLES.ARTIST, user_1.USER_ROLES.INVESTOR), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateProfile);
router.route('/').post((0, validateRequest_1.default)(user_validation_1.UserValidation.createArtistUserZodSchema), user_controller_1.UserController.createUser);
router.delete('/delete', (0, auth_1.default)(user_1.USER_ROLES.ADMIN), user_controller_1.UserController.deleteProfile);
exports.UserRouter = router;
