"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../app/modules/user/user.route");
const auth_route_1 = require("../app/modules/auth/auth.route");
const catalog_routes_1 = require("../app/modules/catalog/catalog.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/catalogs',
        route: catalog_routes_1.CatalogRouter,
    },
];
routes.forEach((element) => {
    if ((element === null || element === void 0 ? void 0 : element.path) && (element === null || element === void 0 ? void 0 : element.route)) {
        router.use(element === null || element === void 0 ? void 0 : element.path, element === null || element === void 0 ? void 0 : element.route);
    }
});
exports.default = router;
