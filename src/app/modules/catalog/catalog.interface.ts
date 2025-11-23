import { Document, Types } from "mongoose";

// ============================
// Royalty Split
// ============================
export interface IRoyaltySplit {
  name: string;
  royalty: number;
}

// ============================
// Rights Document
// ============================
export interface IRightsDocument {
  ownerName: string;
  royaltySplits: IRoyaltySplit[];
  legalDocuments: string;
}

// ============================
// Track
// ============================
export interface ITrack {
  title: string;
  duration: string;
  ISRC: string;
  sample: string;
}

// ============================
// Catalog (Main Interface)
// ============================
export interface ICatalog extends Document {
  userId: Types.ObjectId;
  title: string;
  primaryArtist: string;
  language: string;
  genre: string[];                     // UPDATED BASED ON SCHEMA
  shortDescription: string;
  releaseYear: string;
  track: ITrack[];
  rights: IRightsDocument;
  masterRights: number;
  publishingRights: number;
  askingPrice: number;
  investmentGoal: number;
  status: "APPROVED" | "REJECTED" | "PENDING";
  listingDuration: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================
// Step 1 Create
// ============================
export interface ICreateCatalogStep1 {
  title: string;
  primaryArtist: string;
  releaseYear: string;
  genre: string[];                     // UPDATED to match schema
  language: string;
  shortDescription: string;
}

// ============================
// Step 2 Create
// ============================
export interface ICreateCatalogStep2 {
  track: ITrack[];
}

// ============================
// Step 3 Create
// ============================
export interface ICreateCatalogStep3 {
  rights: IRightsDocument;
  masterRights: number;
  publishingRights: number;
}

// ============================
// Step 4 Create
// ============================
export interface ICreateCatalogStep4 {
  askingPrice: number;
  investmentGoal: number;
  listingDuration: string;
}

// ============================
// Update Catalog Status
// ============================
export interface IUpdateCatalogStatus {
  status: "APPROVED" | "REJECTED";
  rejectionReason: string;
}
