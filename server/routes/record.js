import express from "express";

// Connects to the database
import db from "../db/connection.js";

// To convert id from string to ObjectId
import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

// Create instance of express router
const router = express.Router();

async function printAll() {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    console.log(results);
}

// GET '/' fetches a list of all the records
router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

async function emailExists(email) {
    const collection = await db.collection("users");
    const user = await collection.findOne({ email: email });

    return user !== null;
}

async function groupCodeExists(code) {
    const collection = await db.collection("users");
    const groupCode = await collection.findOne({ code: code });

    return groupCode !== null;
}

// POST '/register' creates a new user in the collection
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);

        const email_exists = await emailExists(req.body.email);
        if (email_exists) {
            console.log("Email already exists.");
            res.status(400).send("Email already exists");
        }
        console.log("email is available");

        const valid_group_code = await groupCodeExists(req.body.groupCode);
        if (req.body.role == "member" && !valid_group_code) {
            console.log("Group code does not exist.");
            res.status(400).send("Group code does not exist");
        }

        if (req.body.role == "leader" && valid_group_code) {
            console.log("Group code shouldn't exist - regenerate one.");
            res.status(400).send("Group code already exists");
        }
        console.log("email is available");

        console.log("User: " + req.body.user + " Hashed: " + hashedPassword);
        
        let newDocument = {
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            pass: hashedPassword,
            role: req.body.role,
            code: req.body.groupCode
        };

        let collection = await db.collection("users");
        let result = await collection.insertOne(newDocument);
        
        // Send result
        res.send(result).status(204);
        console.log("Successfully added user to db");
        printAll();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const collection = await db.collection("users");

    // Try to match by email OR username
    const user = await collection.findOne({
      $or: [{ email }, { user: email }] // logical OR
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or username" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success — respond with user data
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        username: user.user,
        email: user.email,
        role: user.role,
        code: user.code
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH '/' updates a record by id
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
                user: req.body.user,
                email: req.body.email,
                pass: req.body.pass,
            }
        };

        let collection = await db.collection("users");
        collection.updateOne(query, updates);
        res.send(result).status(200);
        console.log("Successfully updated");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

// PATCH '/' updates a record by id
router.patch("/updateName", async (req, res) => {
    try {
        // TODO: GET ID
        const query = { _id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
            }
        };

        let collection = await db.collection("users");
        collection.updateOne(query, updates);
        res.send(result).status(200);
        console.log("Successfully updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

// DELETE '/' deletes a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};

        const collection = db.collection("users");
        let result = await collection.deleteOne(query);

        // Send success message
        res.send(result).status(200);

        console.log("Removed user");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

// NOT SURE how to test
// GET fetches a list of the records for that specific username
router.get("/flatpage/:username", async (req, res) => { 
    let collection = await db.collection("users");
    let results = await collection.find({$or: [ {"user": req.params.username}, {"email": req.params.username} ]})
    // .toArray()
    .then(user => res.json(user))
    .catch(err => res.json(err))
    // .toArray()  
    // .catch(err => {
    //     console.error("Error fetching records:", err);
    //     res.status(500).send("Error fetching records");
    // });
    // res.send(results).status(200);
});

export default router;