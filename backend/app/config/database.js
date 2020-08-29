const mongoose = require('mongoose');
const mongoDB = 'mongodb://db:27017/appreact';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;