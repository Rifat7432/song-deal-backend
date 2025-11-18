"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const catalogSchema = new mongoose_1.Schema({
    artistId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    // Basic Information
    title: {
        type: String,
        required: true
    },
    albumName: String,
    primaryArtist: {
        type: String,
        required: true
    },
    releaseYear: Number,
    genre: {
        type: String,
        enum: ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'],
        required: true
    },
    language: {
        type: String,
        default: 'English'
    },
    shortDescription: {
        type: String,
        maxlength: 500
    },
    // Cover Art
    coverImage: String,
    albumArtwork: String,
    // Tracks
    tracks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Track'
        }],
    // Rights & Documents
    rightsOwner: String,
    royaltySplit: [{
            name: String,
            percentage: {
                type: Number,
                min: 0,
                max: 100
            }
        }],
    legalDocuments: [{
            filename: String,
            url: String,
            uploadedAt: Date
        }],
    // Investment Details
    investmentGoal: {
        type: Number,
        required: true
    },
    askingPrice: Number,
    currentFunding: {
        type: Number,
        default: 0
    },
    fundingPercentage: {
        type: Number,
        default: 0
    },
    numberOfInvestors: {
        type: Number,
        default: 0
    },
    listingDuration: Number, // in days
    // Valuation
    valuation: Number,
    // Rights Information
    masterRights: {
        type: Number,
        min: 0,
        max: 100
    },
    publishingRights: {
        type: Number,
        min: 0,
        max: 100
    },
    // Status & Dates
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'live', 'fully_funded', 'closed'],
        default: 'pending'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    approvalDate: Date,
    listingEndDate: Date,
    goLiveDate: Date,
    // Admin Review
    rejectionReason: String,
    reviewedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
const Catalog = mongoose_1.default.model('Catalog', catalogSchema);
