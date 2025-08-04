// Any updates to the users database is here.

import express from "express";

// Connects to the database
import db from "../db/connection.js";

// To convert id from string to ObjectId
import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

// Create instance of express router
const router = express.Router();

// TODO: POST /reset/send-pin
router.post('/send-pin', async (req, res) => {
  const { email } = req.body;
  const pin = generatePin(); // Generate random 6-digit PIN

  // Save pin to DB or cache, email it to the user
  console.log("pin generated: ", pin);

  res.status(200).send({ message: "PIN sent" });
});

// TODO: POST /reset/verify-pin
router.post('/verify-pin', async (req, res) => {
  const { email, pin } = req.body;
  // Check pin validity from DB or cache
  res.status(200).send({ message: "PIN verified" });
});

// POST /reset/update-password
router.patch('/update-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Basic validation
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    const result = await db.collection("users").updateOne(
      { email },
      { $set: { password: hashed } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Password reset successfully." });

  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH '/' updates a record by id
router.patch("/update-name/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId || !req.body.name) {
            return res.status(400).json({ message: "Missing ID or name" });
        }

        const query = { _id: new ObjectId(userId) };
        const updates = {
            $set: { name: req.body.name }
        };

        const collection = await db.collection("users");
        const result = await collection.updateOne(query, updates);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Name updated successfully" });
        console.log(`User ${userId} name updated to "${req.body.name}"`);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).send("Error updating record");
    }
});

router.patch("/update-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Username is required." });
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { user } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Username updated." });
  } catch (err) {
    console.error("Update name error:", err);
    res.status(500).send("Server error");
  }
});

router.patch("/update-email/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Optional: check if email is already in use
    const existing = await db.collection("users").findOne({ email });
    if (existing && existing._id.toString() !== userId) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { email } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Email updated." });
  } catch (err) {
    console.error("Update email error:", err);
    res.status(500).send("Server error");
  }
});

router.patch("/update-code/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required." });
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { code } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Group code updated." });
  } catch (err) {
    console.error("Update code error:", err);
    res.status(500).send("Server error");
  }
});

// // PATCH '/' updates a record by id
// router.patch("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id)};
//         const updates = {
//             $set: {
//                 name: req.body.name,
//                 user: req.body.user,
//                 email: req.body.email,
//                 pass: req.body.pass,
//             }
//         };

//         let collection = await db.collection("users");
//         collection.updateOne(query, updates);
//         res.send(result).status(200);
//         console.log("Successfully updated");

//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating record");
//     }
// });

export default router;