const express = require("express");
const connectMongoDb = require('./connection')
const userRoutes = require('./routes/routes')
const app = express();

// Mogodb connection establisment
connectMongoDb("mongodb://127.0.0.1:27017/urlshortener");

// Middleware 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// Routes
app.use('/url',userRoutes);

// Server
app.listen(3000,()=>{
    console.log("Server started at 3000")
});