import express, { NextFunction, Request, Response } from 'express';
import { CatalogController } from './catalog.controller';
import { CatalogValidation } from './catalog.validation';
import { getSingleFilePath } from '../../../shared/getFilePath';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.route('/').post(auth(USER_ROLES.ARTIST), validateRequest(CatalogValidation.CreateCatalogSchema), CatalogController.createCatalog);

router.route('/').get(
    //  (req: Request, res: Response, next: NextFunction) => {
    //       console.log('this api hit');
    //       next();
    //  },
     CatalogController.getCatalogs,
);

router.route('/user').get(auth(USER_ROLES.ARTIST), CatalogController.getCatalogsByUserId);

router.route('/details/:id').get(auth(USER_ROLES.ARTIST, USER_ROLES.ADMIN, USER_ROLES.INVESTOR), CatalogController.getCatalogById);

router.route('/:id').get(auth(), CatalogController.getCatalog);

router.route('/status/:id').patch(auth(USER_ROLES.ADMIN), CatalogController.updateCatalogStatus);

router.route('/:id').patch(auth(USER_ROLES.ARTIST), validateRequest(CatalogValidation.UpdateCatalogSchema), CatalogController.updateCatalogStatus);

router.route('/:id').delete(auth(USER_ROLES.ARTIST), CatalogController.deleteCatalog);

export const CatalogRouter = router;
