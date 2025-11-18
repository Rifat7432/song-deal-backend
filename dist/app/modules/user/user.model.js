"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const user_1 = require("../../../enums/user");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: Object.values(user_1.USER_ROLES),
        default: user_1.USER_ROLES.ARTIST,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8,
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    stripeCustomerId: {
        type: String,
        default: '',
    },
    authentication: {
        type: {
            isResetPassword: {
                type: Boolean,
                default: false,
            },
            oneTimeCode: {
                type: Number,
                default: null,
            },
            expireAt: {
                type: Date,
                default: null,
            },
        },
        select: false,
    },
}, { timestamps: true });
// Exist User Check
userSchema.statics.isExistUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.User.findById(id);
});
userSchema.statics.isExistUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.User.findOne({ email });
});
userSchema.statics.isExistUserByPhone = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.User.findOne({ contact });
});
// Password Matching
userSchema.statics.isMatchPassword = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashPassword);
});
// Pre-Save Hook for Hashing Password & Checking Email Uniqueness
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield exports.User.findOne({ email: this.get('email') });
        if (isExist) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email already exists!');
        }
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Query Middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.User = (0, mongoose_1.model)('User', userSchema);
// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// // ============================================
// // USER MODELS
// // ============================================
// // Base User Schema (for authentication)
// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['artist', 'investor', 'admin'],
//     required: true
//   },
//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },
//   verificationCode: String,
//   verificationCodeExpiry: Date,
//   resetPasswordToken: String,
//   resetPasswordExpiry: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   lastLogin: Date
// }, { timestamps: true });
// const User = mongoose.model('User', userSchema);
