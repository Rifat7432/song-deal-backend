import { model, Schema } from 'mongoose';

// Enum for catalog status
const CATALOG_STATUS = ['APPROVED', 'REJECTED', 'PENDING'];

// Sub-schema for RoyaltySplits
const RoyaltySplitsSchema = new Schema(
     {
          name: { type: String, required: true },
          royalty: { type: Number, required: true },
     },
     { _id: false },
);

// Sub-schema for RightsDocument
const RightsDocumentSchema = new Schema(
     {
          ownerName: { type: String, required: true },
          royaltySplits: { type: [RoyaltySplitsSchema], default: [] },
          legalDocuments: { type: String, default: '' },
     },
     { _id: false },
);

// Sub-schema for Track
const TrackSchema = new Schema(
     {
          title: { type: String, required: true },
          duration: { type: String, default: '' },
          ISRC: { type: String, default: '' },
          sample: { type: String, default: '' },
     },
     { _id: false },
);

// Main Catalog schema
const CatalogSchema = new Schema(
     {
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
          title: { type: String, required: true },
          primaryArtist: { type: String, default: '' },
          language: { type: String, default: '' },
          genre: { type: String, default: '' },
          shortDescription: { type: String, default: '' },
          releaseYear: { type: String, default: '' },
          track: { type: [TrackSchema], required: true },
          rights: { type: RightsDocumentSchema, required: true },
          masterRights: { type: Number, default: 0 },
          publishingRights: { type: Number, default: 0 },
          askingPrice: { type: Number, default: 0 },
          investmentGoal: { type: Number, default: 0 },
          status: { type: String, enum: CATALOG_STATUS, default: 'PENDING' },
          listingDuration: { type: String, default: '' },
     },
     {
          timestamps: true, // createdAt and updatedAt
     },
);

export const Catalog = model('Catalog', CatalogSchema);
