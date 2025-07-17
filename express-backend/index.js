const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

mongoose.connect("!!! DOWNLOAD MONGODBCOMPASS")

// Displays test phrase on webpage
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Displays in terminal what port localhost is running on
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
