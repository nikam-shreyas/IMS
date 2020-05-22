const mongoose = require('mongoose');

mongoose.set('debug',true);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/intern');

module.exports.User = require('./user');

module.exports.Internship = require('./internship');
