const express = require('express');
const url = require("../models/user")
const generateShortCode = require("../Utils/shortCode")
const app = express();

async function handleGetReq(req,res){
    const {shortCode} = req.params;
    console.log(shortCode);
    const existing = await url.findOne({shortCode});
    if(existing){
        existing.clicks += 1;
        await existing.save();
        res.redirect(existing.longUrl);

    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
 }


async function handlePostReq(req,res){
    
    
    const {longUrl} = req.body
    if (!longUrl) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    console.log(longUrl)
    const existing = await url.findOne({longUrl});
    if(existing){
        res.send(existing.shortUrl);
    }
    const shortCode = generateShortCode();
    const shortUrl = `https://short.ly/${shortCode}` 
    const newURL = new url({ longUrl, shortCode,shortUrl });
    await newURL.save();
    res.json({ shortUrl });
}

async function handleDeleteReq(req,res){
    const {shortCode} = req.params;
    console.log(shortCode);
    const existing = await url.findOne({shortCode});
    if(existing){
        await existing.deleteOne();
        res.json({ message: 'Short URL deleted' });
        
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
}

module.exports = {
    handleGetReq,
    handlePostReq,
    handleDeleteReq
}