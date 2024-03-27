const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require("cors")
require("dotenv").config()

const dashboardRoutes = require('./routes/dashboardRoutes');

// init app % middleware
const app = express()
app.use(express.json()) 

// Enable CORS middleware
app.use(cors({
    origin: ["https://dashretailhub-ta3x.onrender.com"],
    credentials: true
}));

// db connection
mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Use your router for the specified routes
app.use('/api', dashboardRoutes);
app.use(cookieParser())

// Define routes
app.get('/', (req, res) => {
    res.json({ message: 'Successfully deployed backend.' });
});

//Set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
