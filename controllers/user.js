const url = require("../models/user");
const generateShortCode = require("../Utils/shortCode");

// Handle GET request to redirect to original URL
async function handleGetReq(req, res) {
    try {
        const { shortCode } = req.params;
        const existing = await url.findOne({ shortCode });
        
        if (existing) {
            // Increment click counter and redirect
            existing.clicks += 1;
            await existing.save();
            res.redirect(existing.longUrl);
        } else {
            res.status(404).render('index', { shortUrl: null, error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).render('index', { shortUrl: null, error: error.message });
    }
}

// Handle POST request to create new short URL
async function handlePostReq(req, res) {
    try {
        const { longUrl } = req.body;
        
        // Validate URL input
        if (!longUrl) {
            return res.render('index', { shortUrl: null, error: 'Please provide a URL' });
        }

        // Check if URL already exists
        const existing = await url.findOne({ longUrl });
        if (existing) {
            return res.render('index', { shortUrl: existing.shortUrl, error: null });
        }

        // Generate new short URL
        const shortCode = generateShortCode();
        const shortUrl = `${req.protocol}://${req.get('host')}/url/${shortCode}`;

        // Save to database
        const newURL = new url({
            longUrl,
            shortCode,
            shortUrl,
            clicks: 0
        });

        await newURL.save();
        res.render('index', { shortUrl, error: null });
    } catch (error) {
        res.status(500).render('index', { shortUrl: null, error: error.message });
    }
}

// Handle DELETE request to remove short URL
async function handleDeleteReq(req, res) {
    try {
        const { shortCode } = req.params;
        const existing = await url.findOneAndDelete({ shortCode });
        
        if (existing) {
            res.json({ message: 'URL deleted successfully' });
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetReq,
    handlePostReq,
    handleDeleteReq
};