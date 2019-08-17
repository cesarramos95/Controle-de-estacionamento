const mongoose = require('../database');

mongoose.connect('mongodb://localhost/controleestacionamento', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;