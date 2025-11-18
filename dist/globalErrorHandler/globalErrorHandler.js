"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const processError_1 = __importDefault(require("./processError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, _next) => {
    // Process the all error function
    const { statusCode, message, errorSources } = (0, processError_1.default)(error);
    // Respond with a consistent error structure
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: errorSources,
        stack: config_1.default.node_env === 'development' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
exports.default = exports.globalErrorHandler;
