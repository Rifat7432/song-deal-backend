import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { getSingleFilePath } from '../../../shared/getFilePath';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLES } from '../../../enums/user';
const router = express.Router();

router
     .route('/profile')
     .get(auth(USER_ROLES.ADMIN, USER_ROLES.ARTIST, USER_ROLES.INVESTOR), UserController.getUserProfile)
     .patch(auth(USER_ROLES.ADMIN, USER_ROLES.ARTIST, USER_ROLES.INVESTOR), validateRequest(UserValidation.updateUserZodSchema), UserController.updateProfile);

router.route('/').post(validateRequest(UserValidation.createArtistUserZodSchema), UserController.createUser);


router.delete('/delete', auth(USER_ROLES.ADMIN), UserController.deleteProfile);

export const UserRouter = router;
