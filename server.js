const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 5000;

// Add JSON Parsing Middleware
app.use(express.json());

// User Corse
app.use(cors());

// Test Route
app.get('/', (req, res) => {
       res.send('Server is up And running');
});

// Mongoose Connection
mongoose.connect(process.env.MONGO_URI)
       .then(() => console.log('MongoDB Connected'))
       .catch(err => console.error(err));

// routes
app.use('/api/users', userRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
       console.log(`Server listening on port ${PORT}`);
});
//