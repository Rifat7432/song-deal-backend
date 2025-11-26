"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogValidation = exports.UpdateCatalogSchema = exports.CreateCatalogSchema = exports.CatalogBaseSchema = exports.TrackSchema = exports.RightsDocumentSchema = exports.RoyaltySplitSchema = exports.CatalogStatusEnum = void 0;
const zod_1 = require("zod");
// ===========================
// ENUM
// ===========================
exports.CatalogStatusEnum = zod_1.z.enum(['APPROVED', 'REJECTED', 'PENDING']);
// ===========================
// Sub-schema: Royalty Splits
// ===========================
exports.RoyaltySplitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    royalty: zod_1.z.number().min(0).max(100),
});
// ===========================
// Sub-schema: Rights Document
// ===========================
exports.RightsDocumentSchema = zod_1.z
    .object({
    ownerName: zod_1.z.string().min(1),
    royaltySplits: zod_1.z.array(exports.RoyaltySplitSchema).default([]),
    legalDocuments: zod_1.z.string().optional().default(''),
})
    .refine((data) => {
    const total = data.royaltySplits.reduce((sum, split) => sum + split.royalty, 0);
    return total <= 100;
}, { message: 'Total royalty split cannot exceed 100%' });
// ===========================
// Sub-schema: Track
// ===========================
exports.TrackSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    duration: zod_1.z.string().optional().default(''),
    ISRC: zod_1.z.string().optional().default(''),
    sample: zod_1.z.string().optional().default(''),
});
// ===========================
// Base Catalog Schema
// (Matches Mongoose)
// ===========================
exports.CatalogBaseSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string().min(1),
        primaryArtist: zod_1.z.string(),
        language: zod_1.z.string(),
        // FIXED: Mongoose uses string[]
        genre: zod_1.z.array(zod_1.z.string()),
        shortDescription: zod_1.z.string(),
        releaseYear: zod_1.z.string(),
        track: zod_1.z.array(exports.TrackSchema).min(1, 'At least one track is required'),
        rights: exports.RightsDocumentSchema,
        masterRights: zod_1.z.number(),
        publishingRights: zod_1.z.number(),
        askingPrice: zod_1.z.number(),
        investmentGoal: zod_1.z.number(),
        listingDuration: zod_1.z.string(),
        status: zod_1.z.never().optional(),
        isDeleted: zod_1.z.never().optional(),
        userId: zod_1.z.never().optional(),
    })
        .strip(),
});
// ===========================
// Create Catalog (Full)
// ===========================
exports.CreateCatalogSchema = exports.CatalogBaseSchema;
// ===========================
// Update Catalog (Partial)
// ===========================
exports.UpdateCatalogSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string().min(1).optional(),
        primaryArtist: zod_1.z.string().optional(),
        language: zod_1.z.string().optional(),
        // FIXED: Mongoose uses string[]
        genre: zod_1.z.array(zod_1.z.string()).optional(),
        shortDescription: zod_1.z.string().optional(),
        releaseYear: zod_1.z.string().optional(),
        track: zod_1.z.array(exports.TrackSchema).min(1, 'At least one track is required').optional(),
        rights: exports.RightsDocumentSchema.optional(),
        masterRights: zod_1.z.number().optional(),
        publishingRights: zod_1.z.number().optional(),
        askingPrice: zod_1.z.number().optional(),
        investmentGoal: zod_1.z.number().optional(),
        listingDuration: zod_1.z.string().optional(),
        status: zod_1.z.never().optional(),
        isDeleted: zod_1.z.never().optional(),
    })
        .strip(),
});
exports.CatalogValidation = {
    CreateCatalogSchema: exports.CreateCatalogSchema,
    UpdateCatalogSchema: exports.UpdateCatalogSchema,
};
