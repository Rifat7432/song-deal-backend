import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema({
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  month: {
    type: Date,
    required: true
  },
  
  // Streaming Data
  streamingRevenue: {
    type: Number,
    default: 0
  },
  totalStreams: {
    type: Number,
    default: 0
  },
  
  // Platform Breakdown
  platformData: [{
    platform: String, // Spotify, Apple Music, etc.
    streams: Number,
    revenue: Number
  }],
  
  // Geographic Data
  topCountries: [{
    country: String,
    streams: Number
  }]
}, { timestamps: true });




const Analytics = mongoose.model('Analytics', analyticsSchema);