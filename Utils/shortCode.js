const crypto = require('crypto');

function generateShortCode() {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-character code
}


module.exports = generateShortCode;