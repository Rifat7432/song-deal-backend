"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dashboardStatsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const DashboardStats = mongoose_1.default.model('DashboardStats', dashboardStatsSchema);
