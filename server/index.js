const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config(); // Load environment variables

const backend = express();

backend.use(express.json());

backend.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

backend.use(routes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGO_URI)
    .then(() => {
        backend.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Connected to server");
        });
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });