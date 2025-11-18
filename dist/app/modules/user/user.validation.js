"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createArtistUserZodSchema = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
exports.createArtistUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email address'),
        role: zod_1.z.enum([user_1.USER_ROLES.ARTIST, user_1.USER_ROLES.INVESTOR]),
        password: zod_1.z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
    }),
});
const createInvestorUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email address'),
        password: zod_1.z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address').optional(),
    }),
});
exports.UserValidation = {
    createArtistUserZodSchema: exports.createArtistUserZodSchema,
    updateUserZodSchema,
    createInvestorUserZodSchema,
};
