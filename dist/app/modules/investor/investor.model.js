"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Investor = void 0;
const mongoose_1 = require("mongoose");
const SocialMediasSchema = new mongoose_1.Schema({
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    soundCloud: { type: String, default: '' },
}, { _id: false });
const InvestorSchema = new mongoose_1.Schema({
    fullname: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, default: '' },
    investmentInterests: { type: String, default: '' },
    companyName: { type: String, default: '' },
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    investmentRange: { type: String, default: '' },
    socialMedias: { type: SocialMediasSchema, default: {} },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});
exports.Investor = (0, mongoose_1.model)('Investor', InvestorSchema);
