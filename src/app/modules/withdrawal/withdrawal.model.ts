import mongoose, { Schema } from "mongoose";

const withdrawalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userType: {
    type: String,
    enum: ['artist', 'investor'],
    required: true
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  investorId: {
    type: Schema.Types.ObjectId,
    ref: 'Investor'
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  },
  amount: {
    type: Number,
    required: true,
    min: 100 // Minimum withdrawal amount $100
  },
  availableBalance: Number,
  
  // Withdrawal Flow Status
  flowStatus: {
    type: String,
    enum: ['payout_submitted', 'admin_review', 'paid'],
    default: 'payout_submitted'
  },
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  processedDate: Date,
  
  // Bank Details
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    routingNumber: String,
    swiftCode: String
  },
  
  // Transaction Reference
  transactionId: String,
  
  rejectionReason: String,
  adminNotes: String
}, { timestamps: true });


const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);