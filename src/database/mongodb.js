const mongoose = require('mongoose');
const config = require('../config/database.json').mongodb;

mongoose.connect('mongodb://'.concat(config.host, '/', config.database), { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;