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
// Base Catalog Schema (shared)
// ===========================
export const CatalogBaseSchema = z.object({
     title: z.string().min(1),
     primaryArtist: z.string().optional().default(''),
     language: z.string().optional().default(''),
     genre: z.string().optional().default(''),
     shortDescription: z.string().optional().default(''),
     releaseYear: z.string().optional().default(''),
     track: z.array(TrackSchema).min(1, 'At least one track is required'),
     rights: RightsDocumentSchema,
     masterRights: z.number().optional().default(0),
     publishingRights: z.number().optional().default(0),
     askingPrice: z.number().optional().default(0),
     investmentGoal: z.number().optional().default(0),
     listingDuration: z.string().optional().default(''),
     status: CatalogStatusEnum.optional().default('PENDING'),
});

// ===========================
// Create Catalog (Full)
// ===========================
const CreateCatalogSchema = CatalogBaseSchema;

// ===========================
// Update Catalog (Partial)
// Allow updating any field EXCEPT userId and status logic is handled in service
// ===========================
const UpdateCatalogSchema = CatalogBaseSchema.partial();

export const CatalogValidation = { CreateCatalogSchema, UpdateCatalogSchema };
