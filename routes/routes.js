const express = require('express');
const router = express.Router(); 
const {handleSignUpReq} = require('../controllers/signUpUser')
const { handlePostReq, handleDeleteReq, handleGetReq } = require('../controllers/user');


// Route for creating new short URL - POST /url/
router.post('/', handlePostReq); 

// Route for deleting short URL - DELETE /url/:shortCode
router.delete('/:shortCode', handleDeleteReq);

// Route for redirecting to original URL - GET /url/:shortCode
router.get('/:shortCode', handleGetReq); 



module.exports = router;