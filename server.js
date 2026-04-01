const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Middleware ---
// Allows the backend to communicate with a frontend (Cross-Origin Resource Sharing)
app.use(cors());
// Allows the server to understand and parse JSON data in request bodies
app.use(express.json());
// Import Routes
const recordRoutes = require('./routes/recordRoutes');

// Use Routes
app.use('/api', recordRoutes);
// --- Database Connection ---
// We use the MONGO_URI from your .env file
const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
    });

// --- Basic Test Route ---
// You can visit http://localhost:5000 in your browser to check this
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Finance Backend API is running",
        status: "Online"
    });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Local URL: http://localhost:${PORT}`);
});