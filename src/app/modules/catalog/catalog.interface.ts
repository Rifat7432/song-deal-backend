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
  isDeleted:boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface IUpdateCatalogStatus {
  status: "APPROVED" | "REJECTED";
  rejectionReason: string;
}
