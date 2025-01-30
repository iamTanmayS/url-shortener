const express = require('express');
const staticRouter = express.Router();
const signUpController = require('../controllers/signUpUser');
const loginController = require('../services/auth/login')
staticRouter.get('/', (req, res) => {
    res.render('index',{shortUrl:null});
})

staticRouter.get('/signUp', (req, res) => {
    res.render('signUpPage', {
        name: null,
        email: null,
        password: null, 
        error: null
    });
});

staticRouter.get('/login', (req, res) => {
    res.render('loginPage', {
        email: null,
        password: null,
        error: null
    });
})

staticRouter.post('/signUp', signUpController.handleSignUpReq);
staticRouter.post('/login', loginController.handleLoginReq);
module.exports = staticRouter

