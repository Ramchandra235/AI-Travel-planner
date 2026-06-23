const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  generateTrip,
} = require("../controllers/aiController");

router.post(
  "/generate",
  authMiddleware,
  generateTrip
);

module.exports = router;
