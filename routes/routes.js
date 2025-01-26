const express = require('express');
const router = express.Router(); 
const { handlePostReq, handleDeleteReq, handleGetReq } = require('../controllers/user');

// Define the routes
router.post('/', handlePostReq); 
router.delete('/:shortCode', handleDeleteReq);
router.get('/:shortCode', handleGetReq); 

module.exports = router; 