const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://dashretailhub-ta3x.onrender.com"],
    credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// API routes
app.use('/api', dashboardRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'build')));

// Serve React app for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
