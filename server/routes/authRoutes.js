const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const router = Router();

const {
  signup,
  getCurrentUser,
  signin
} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

// Rate limiting for login attempts
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for registration
const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registrations per hour
  message: {
    success: false,
    message: "Too many registration attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", registerRateLimit, signup);
router.post("/login", loginRateLimit, signin);
router.get("/user", authorization, getCurrentUser);

module.exports = router;
