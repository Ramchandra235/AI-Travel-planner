const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  estimatedCostUSD: {
    type: Number,
    default: 0,
  },

  timeOfDay: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
  },
});

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
    },

    budgetTier: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: [String],

    aiItinerary: {
      type: String,
      default: "",
    },

    itinerary: [
      {
        dayNumber: Number,
        activities: [ActivitySchema],
      },
    ],

    hotels: [
      {
        name: String,
        tier: String,
        estimatedCostNightUSD: Number,
        rating: String,
      },
    ],

    estimatedBudget: {
      transport: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      total: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Trip",
  TripSchema
);