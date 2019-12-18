const crypto = require('crypto');
const hashPassword = (secret, password) => {
    return crypto
                .createHmac('sha256', secret)
                .update(password)
                .digest('hex');
}

module.exports = hashPassword