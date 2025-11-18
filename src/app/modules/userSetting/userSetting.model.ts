import mongoose, { Schema } from "mongoose";

const userSettingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Notification Preferences
  notifications: {
    productUpdates: {
      type: Boolean,
      default: true
    },
    checkoutProduct: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    }
  },
  
  // Privacy Settings
  privacy: {
    showProfile: {
      type: Boolean,
      default: true
    },
    showInvestments: {
      type: Boolean,
      default: false
    }
  },
  
  // Display Preferences
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },
  language: {
    type: String,
    default: 'en'
  }
}, { timestamps: true });


const UserSettings = mongoose.model('UserSettings', userSettingsSchema);