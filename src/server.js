const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/", taskRoutes);

 connectDB();

app.get("/", (req, res) => {
    res.send("Task Management API Running...");
});

 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
 });