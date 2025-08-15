const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const studentRoutes = require("./routes/students");
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  return res.send("Welcome to Rohith Marks API");
});

app.use("/api/students", express.json(), studentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
