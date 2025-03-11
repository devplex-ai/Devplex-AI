const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
require("../services/pasport.js");

const router = express.Router();

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// GitHub Auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// Email & Password Register
router.post("/register", async (req, res) => {
  const {  email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({  email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User registered" });
});

// Email & Password Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
