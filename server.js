const express = require("express");
const connectMongoDb = require('./connection');
const staticRouter = require('./routes/staticRoute')
const signUpController = require('./controllers/signUpUser')
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
app.use('/',staticRouter);
app.use('/url', userRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});