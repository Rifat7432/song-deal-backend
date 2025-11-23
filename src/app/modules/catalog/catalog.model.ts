import { model, Schema } from 'mongoose';
import { IRoyaltySplit, IRightsDocument, ITrack, ICatalog } from './catalog.interface'; // <-- adjust import path

// ============================
// Sub-schema: Royalty Splits
// ============================
const RoyaltySplitsSchema = new Schema<IRoyaltySplit>(
     {
          name: { type: String, required: true },
          royalty: { type: Number, required: true },
     },
     { _id: false },
);

// ============================
// Sub-schema: Rights Document
// ============================
const RightsDocumentSchema = new Schema<IRightsDocument>(
     {
          ownerName: { type: String, required: true },
          royaltySplits: { type: [RoyaltySplitsSchema], default: [] },
          legalDocuments: { type: String, default: '' },
     },
     { _id: false },
);

// ============================
// Sub-schema: Track
// ============================
const TrackSchema = new Schema<ITrack>(
     {
          title: { type: String, required: true },
          duration: { type: String, default: '' },
          ISRC: { type: String, default: '' },
          sample: { type: String, default: '' },
     },
     { _id: false },
);

// ============================
// Main Catalog Schema (Typed)
// ============================
const CatalogSchema = new Schema<ICatalog>(
     {
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

          title: { type: String, required: true },
          primaryArtist: { type: String, default: '' },
          language: { type: String, default: '' },

          // FIXED: Should be array of strings
          genre: { type: [String], default: [] },

          shortDescription: { type: String, default: '' },
          releaseYear: { type: String, default: '' },

          track: { type: [TrackSchema], required: true },
          rights: { type: RightsDocumentSchema, required: true },

          masterRights: { type: Number, default: 0 },
          publishingRights: { type: Number, default: 0 },

          askingPrice: { type: Number, default: 0 },
          investmentGoal: { type: Number, default: 0 },

          status: { type: String, enum: ['APPROVED', 'REJECTED', 'PENDING'], default: 'PENDING' },
          listingDuration: { type: String, default: '' },
     },
     {
          timestamps: true,
     },
);

// ============================
// Export Typed Model
// ============================
export const Catalog = model<ICatalog>('Catalog', CatalogSchema);
