import express from "express";

// Connects to the database
import db from "../db/connection.js";

// To convert id from string to ObjectId
import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

// Create instance of express router
const router = express.Router();

// POST /reset/send-pin
router.post('/send-pin', async (req, res) => {
  const { email } = req.body;
  const pin = generatePin(); // Generate random 6-digit PIN
  // Save pin to DB or cache, email it to the user
  res.status(200).send({ message: "PIN sent" });
});

// POST /reset/verify-pin
router.post('/verify-pin', async (req, res) => {
  const { email, pin } = req.body;
  // Check pin validity from DB or cache
  res.status(200).send({ message: "PIN verified" });
});

// POST /reset/update-password
router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await users.updateOne({ email }, { $set: { password: hashed } });
  res.status(200).send({ message: "Password reset" });
});

export default router;