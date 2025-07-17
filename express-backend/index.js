const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Displays test phrase on webpage
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Displays in terminal what port localhost is running on
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
