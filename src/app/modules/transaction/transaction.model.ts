import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['investment', 'withdrawal', 'royalty_payout', 'commission'],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedId: Schema.Types.ObjectId, // Can reference Investment, Catalog, etc.
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  
  // Payment Details
  paymentMethod: String,
  paymentGateway: String,
  gatewayTransactionId: String
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);