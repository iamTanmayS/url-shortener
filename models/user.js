const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    longUrl: {
         type: String, 
         required: true
         }, 
    // Matches the field you're sending in your function
  shortCode: { 
    type: String, 
    required: true, 
    unique: true }, // Matches `shortCode` from your function

  shortUrl:{ 
    type: String, 
    required: true }, // Required but missing in your function
    
  clicks: { 
    type: Number,
     default: 0 }, // Set default to avoid validation errors

    created_at: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('URL', urlSchema);