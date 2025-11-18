import mongoose, { Schema } from "mongoose";

const trackSchema = new Schema({
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String, // Format: "MM:SS"
    required: true
  },
  isrc: String, // International Standard Recording Code
  audioFileUrl: String,
  
  // Performance Data
  streamingRevenue: [{
    month: Date,
    revenue: Number
  }],
  totalStreams: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
const Track = mongoose.model('Track', trackSchema);