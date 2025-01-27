const express = require("express");
const connectMongoDb = require('./connection');
const path = require('path');
const userRoutes = require('./routes/routes');
const app = express();

// MongoDB connection setup
connectMongoDb("mongodb://127.0.0.1:27017/urlshortener")
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Middleware setup
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded bodies
app.use(express.json());  // Parse JSON bodies
app.use(express.static('public'));  // Serve static files
app.set('view engine', 'ejs');  // Set view engine
app.set('views', path.join(__dirname, 'views'));  // Set views directory

// Routes setup
app.get('/', (req, res) => {  // Home page route
    res.render('index', { shortUrl: null, error: null });
});
app.use('/url', userRoutes);  // URL shortener routes

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('index', { shortUrl: null, error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});