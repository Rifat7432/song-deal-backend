import express, { NextFunction, Request, Response } from 'express';
import { CatalogController } from './catalog.controller';
import { CatalogValidation } from './catalog.validation';
import { getSingleFilePath } from '../../../shared/getFilePath';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLES } from '../../../enums/user';
const router = express.Router();



router.route('/').post(validateRequest(CatalogValidation.createArtistCatalogZodSchema), CatalogController.createCatalog);




export const CatalogRouter = router;
