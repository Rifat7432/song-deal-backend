"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./globalErrorHandler/globalErrorHandler"));
const notFound_1 = require("./app/middleware/notFound");
const welcome_1 = require("./utils/welcome");
const path_1 = __importDefault(require("path"));
const morgen_1 = require("./shared/morgen");
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
//morgan
app.use(morgen_1.Morgan.successHandler);
app.use(morgen_1.Morgan.errorHandler);
//body parser
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//file retrieve
app.use(express_1.default.static('uploads'));
app.use(express_1.default.static('public'));
//router
app.use('/api/v1', routes_1.default);
//live response
app.get('/', (req, res) => {
    res.send((0, welcome_1.welcome)());
});
//global error handle
app.use(globalErrorHandler_1.default);
//handle not found route;
app.use(notFound_1.notFound);
exports.default = app;
