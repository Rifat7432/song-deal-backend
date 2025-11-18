import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['ticket_purchase', 'winner_announcement', 'low_ticket_alert', 'investment', 'catalog_status', 'withdrawal', 'system'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  relatedId: Schema.Types.ObjectId, // Reference to related document
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
const Notification = mongoose.model('Notification', notificationSchema);