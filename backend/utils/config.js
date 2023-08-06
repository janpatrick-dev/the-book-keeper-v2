const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;
const TOKEN_SECRET = process.env.PROD_TOKEN_SECRET;
const TOKEN_DURATION = Number(process.env.PROD_TOKEN_DURATION);

module.exports = { MONGODB_URL, PORT, TOKEN_SECRET, TOKEN_DURATION };




