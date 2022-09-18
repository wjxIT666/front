const mongoose = require('mongoose');
const { DB, DOMAIN, DB_PORT, DB_NAME } = require('../config/config.default.js');
const mon = mongoose.connect(`${DB}://${DOMAIN}:${DB_PORT}/${DB_NAME}`);

module.exports = mon;