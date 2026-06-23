const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createTrip,
  getTrips,
  deleteTrip,
} = require("../controllers/tripController");

router.post(
  "/",
  authMiddleware,
  createTrip
);

router.get(
  "/",
  authMiddleware,
  getTrips
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTrip
);

module.exports = router;