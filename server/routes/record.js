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

// POST '/register' creates a new user in the collection
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
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

// NOT TESTED
router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  const user = users.find(user => user.email === email || user.user === email);

  if (!user || !(await bcrypt.compare(pass, user.pass))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Signin successful', user: { username: user.username, email: user.email } });
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

export default router;