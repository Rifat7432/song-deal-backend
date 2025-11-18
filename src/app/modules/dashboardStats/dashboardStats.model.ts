import mongoose, { Schema } from "mongoose";

const dashboardStatsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userType: {
    type: String,
    enum: ['admin', 'artist', 'investor']
  },
  date: {
    type: Date,
    required: true
  },
  
  // Admin Global Stats
  totalArtists: Number,
  totalInvestors: Number,
  totalCatalogs: Number,
  totalInvestments: Number,
  totalRevenue: Number,
  pendingWithdrawals: Number,
  customers: Number,
  
  // Artist Dashboard Stats
  totalFundsRaised: Number,
  activeInvestors: Number,
  totalCatalogsUploaded: Number,
  
  // Performance Metrics
  orders: {
    newOrders: {
      count: Number,
      status: String // 'processing'
    },
    onHold: {
      count: Number,
      status: String
    },
    delivered: {
      count: Number,
      status: String
    }
  },
  
  // Growth Metrics
  userGrowth: Number, // Percentage
  revenueGrowth: Number,
  catalogGrowth: Number,
  customerGrowth: Number,
  
  // Monthly performance data
  monthlyData: [{
    month: String,
    followers: Number,
    plays: Number,
    revenue: Number
  }],
  
  // Sales Overview (last 7 days)
  salesOverview: {
    period: String, // 'Last 7 days'
    segments: [{
      percentage: Number,
      color: String
    }]
  }
}, { timestamps: true });


const DashboardStats = mongoose.model('DashboardStats', dashboardStatsSchema);