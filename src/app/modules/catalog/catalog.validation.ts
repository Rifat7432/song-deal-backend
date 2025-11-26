import { z } from 'zod';

// ===========================
// ENUM
// ===========================
export const CatalogStatusEnum = z.enum(['APPROVED', 'REJECTED', 'PENDING']);

// ===========================
// Sub-schema: Royalty Splits
// ===========================
export const RoyaltySplitSchema = z.object({
     name: z.string().min(1),
     royalty: z.number().min(0).max(100),
});

// ===========================
// Sub-schema: Rights Document
// ===========================
export const RightsDocumentSchema = z
     .object({
          ownerName: z.string().min(1),
          royaltySplits: z.array(RoyaltySplitSchema).default([]),
          legalDocuments: z.string().optional().default(''),
     })
     .refine(
          (data) => {
               const total = data.royaltySplits.reduce((sum, split) => sum + split.royalty, 0);
               return total <= 100;
          },
          { message: 'Total royalty split cannot exceed 100%' },
     );

// ===========================
// Sub-schema: Track
// ===========================
export const TrackSchema = z.object({
     title: z.string().min(1),
     duration: z.string().optional().default(''),
     ISRC: z.string().optional().default(''),
     sample: z.string().optional().default(''),
});

// ===========================
// Base Catalog Schema
// (Matches Mongoose)
// ===========================
export const CatalogBaseSchema = z.object({
     body: z
          .object({
               title: z.string().min(1),
               primaryArtist: z.string(),
               language: z.string(),

               // FIXED: Mongoose uses string[]
               genre: z.array(z.string()),

               shortDescription: z.string(),
               releaseYear: z.string(),

               track: z.array(TrackSchema).min(1, 'At least one track is required'),
               rights: RightsDocumentSchema,

               masterRights: z.number(),
               publishingRights: z.number(),

               askingPrice: z.number(),
               investmentGoal: z.number(),

               listingDuration: z.string(),
               status: z.never().optional(),
               isDeleted: z.never().optional(),
               userId: z.never().optional(),
          })
          .strip(),
});

// ===========================
// Create Catalog (Full)
// ===========================
export const CreateCatalogSchema = CatalogBaseSchema;

// ===========================
// Update Catalog (Partial)
// ===========================
export const UpdateCatalogSchema = z.object({
     body: z
          .object({
               title: z.string().min(1).optional(),
               primaryArtist: z.string().optional(),
               language: z.string().optional(),

               // FIXED: Mongoose uses string[]
               genre: z.array(z.string()).optional(),

               shortDescription: z.string().optional(),
               releaseYear: z.string().optional(),

               track: z.array(TrackSchema).min(1, 'At least one track is required').optional(),
               rights: RightsDocumentSchema.optional(),

               masterRights: z.number().optional(),
               publishingRights: z.number().optional(),

               askingPrice: z.number().optional(),
               investmentGoal: z.number().optional(),

               listingDuration: z.string().optional(),
               status: z.never().optional(),
               isDeleted: z.never().optional(),
          })
          .strip(),
});

export const CatalogValidation = {
     CreateCatalogSchema,
     UpdateCatalogSchema,
};
