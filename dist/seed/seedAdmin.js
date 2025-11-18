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
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../app/modules/user/user.model");
const config_1 = __importDefault(require("../config"));
const user_1 = require("../enums/user");
const logger_1 = require("../shared/logger");
const colors_1 = __importDefault(require("colors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersData = [
    {
        name: 'Administrator',
        email: config_1.default.super_admin.email,
        role: user_1.USER_ROLES.ADMIN,
        password: config_1.default.super_admin.password,
        verified: true,
    },
    {
        name: 'User',
        email: 'user@gmail.com',
        role: user_1.USER_ROLES.ARTIST,
        password: 'hello123',
        verified: true,
    },
];
// Function to hash passwords
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    return yield bcrypt_1.default.hash(password, salt);
});
// Function to seed users
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.User.deleteMany();
        const hashedUsersData = yield Promise.all(usersData.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPassword = yield hashPassword(user.password);
            return Object.assign(Object.assign({}, user), { password: hashedPassword });
        })));
        // Insert users into the database
        yield user_model_1.User.insertMany(hashedUsersData);
        logger_1.logger.info(colors_1.default.green('✨ --------------> Users seeded successfully <-------------- ✨'));
    }
    catch (err) {
        logger_1.logger.error(colors_1.default.red('💥 Error seeding users: 💥'), err);
    }
});
// Connect to MongoDB
mongoose_1.default.connect(config_1.default.database_url);
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info(colors_1.default.cyan('🎨 --------------> Database seeding start <--------------- 🎨'));
        // Start seeding users
        yield seedUsers();
        logger_1.logger.info(colors_1.default.green('🎉 --------------> Database seeding completed <--------------- 🎉'));
    }
    catch (error) {
        logger_1.logger.error(colors_1.default.red('🔥 Error creating Super Admin: 🔥'), error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
seedSuperAdmin();
