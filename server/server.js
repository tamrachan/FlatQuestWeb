import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

// app.post('/login', (req, res) => {
//     console.log("Server received: ", req.body)
//     console.log("email: ", req.body.email)
//     console.log("pass: ", req.body.pass)
// })

// app.post('/register', (req, res) => {
//     console.log("Server received: ", req.body)
//     console.log("email: ", req.body.email)
//     console.log("pass: ", req.body.pass)
// })