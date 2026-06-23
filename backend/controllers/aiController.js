const Trip = require("../models/Trip");

const {
  generateItinerary,
} = require("../services/geminiService");

exports.generateTrip = async (req, res) => {
  try {
    const {
      destination,
      durationDays,
      budgetTier,
      interests,
    } = req.body;

    const itinerary =
      await generateItinerary(
        destination,
        durationDays,
        budgetTier,
        interests
      );

    console.log("AI ITINERARY:");
    console.log(itinerary);

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetTier,
      interests,
      aiItinerary: itinerary,
      itinerary: [],
    });

    console.log("SAVED TRIP:");
    console.log(trip);

    res.status(201).json({
      success: true,
      trip,
      itinerary,
    });
  } catch (error) {
    console.error(
      "AI Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};