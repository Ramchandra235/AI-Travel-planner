const Trip = require("../models/Trip");

// CREATE TRIP
exports.createTrip = async (req, res) => {
  try {
    const {
      destination,
      durationDays,
      budgetTier,
      interests,
    } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetTier,
      interests,
      itinerary: [],
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER TRIPS
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user.id,
    });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TRIP
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};