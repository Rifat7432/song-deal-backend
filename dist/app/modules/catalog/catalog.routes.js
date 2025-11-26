"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogRouter = void 0;
const express_1 = __importDefault(require("express"));
const catalog_controller_1 = require("./catalog.controller");
const catalog_validation_1 = require("./catalog.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.route('/').post((0, auth_1.default)(user_1.USER_ROLES.ARTIST), (0, validateRequest_1.default)(catalog_validation_1.CatalogValidation.CreateCatalogSchema), catalog_controller_1.CatalogController.createCatalog);
router.route('/').get(
//  (req: Request, res: Response, next: NextFunction) => {
//       console.log('this api hit');
//       next();
//  },
catalog_controller_1.CatalogController.getCatalogs);
router.route('/user').get((0, auth_1.default)(user_1.USER_ROLES.ARTIST), catalog_controller_1.CatalogController.getCatalogsByUserId);
router.route('/details/:id').get((0, auth_1.default)(user_1.USER_ROLES.ARTIST, user_1.USER_ROLES.ADMIN, user_1.USER_ROLES.INVESTOR), catalog_controller_1.CatalogController.getCatalogById);
router.route('/:id').get((0, auth_1.default)(), catalog_controller_1.CatalogController.getCatalog);
router.route('/status/:id').patch((0, auth_1.default)(user_1.USER_ROLES.ADMIN), catalog_controller_1.CatalogController.updateCatalogStatus);
router.route('/:id').patch((0, auth_1.default)(user_1.USER_ROLES.ARTIST), (0, validateRequest_1.default)(catalog_validation_1.CatalogValidation.UpdateCatalogSchema), catalog_controller_1.CatalogController.updateCatalogStatus);
router.route('/:id').delete((0, auth_1.default)(user_1.USER_ROLES.ARTIST), catalog_controller_1.CatalogController.deleteCatalog);
exports.CatalogRouter = router;
