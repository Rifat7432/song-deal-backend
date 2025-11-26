"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const mongoose_1 = require("mongoose");
const PortfolioLinksSchema = new mongoose_1.Schema({
    spotify: { type: String, default: '' },
    youtube: { type: String, default: '' },
    audioMack: { type: String, default: '' },
    soundCloud: { type: String, default: '' },
}, { _id: false });
const SocialMediasSchema = new mongoose_1.Schema({
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    soundCloud: { type: String, default: '' },
}, { _id: false });
const ArtistSchema = new mongoose_1.Schema({
    fullname: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    genres: { type: String, default: '' },
    portfolioLinks: { type: PortfolioLinksSchema, default: {} },
    socialMedias: { type: SocialMediasSchema, default: {} },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true, // This automatically adds createdAt and updatedAt
});
exports.Artist = (0, mongoose_1.model)('Artist', ArtistSchema);
