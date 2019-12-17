const crypto = require('crypto');

const secret = '12345';
const hash = crypto.createHmac('sha256', secret)
                   .update('123456')
                   .digest('hex');
console.log(hash);