const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cage');
mongoose.Promise = global.Promise;

module.exports = mongoose;