const express = require('express');
const staticRouter = express.Router();
staticRouter.get('/', (req, res) => {
    res.render('index',{shortUrl:null});
})


module.exports = staticRouter

