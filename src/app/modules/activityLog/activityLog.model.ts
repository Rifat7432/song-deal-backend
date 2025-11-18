import mongoose, { Schema } from "mongoose";



const activityLogSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  email: String,
  status: {
    type: String,
    enum: ['paid', 'pending', 'failed']
  },
  details: String,
  type: {
    type: String,
    enum: ['artist_join', 'investment', 'catalog_upload', 'withdrawal_request', 'payment']
  }
}, { timestamps: true });



const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);