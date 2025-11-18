import mongoose, { Schema } from "mongoose";

const investmentSchema = new Schema({
  investorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  shares: {
    type: Number, // Percentage of ownership
    required: true
  },
  type: {
    type: String,
    enum: ['sale', 'royalty', 'simulated'],
    default: 'sale'
  },
  
  // Simulated Investment Flag
  isSimulated: {
    type: Boolean,
    default: false
  },
  simulatedNote: {
    type: String,
    default: 'This is a dummy transaction to gauge interest. No real money is involved.'
  },
  
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  investmentDate: {
    type: Date,
    default: Date.now
  },
  
  // Returns
  totalReturns: {
    type: Number,
    default: 0
  },
  lastPayoutDate: Date
}, { timestamps: true });
const Investment = mongoose.model('Investment', investmentSchema);