const mongoose = require('mongoose');

mongoose.set('debug',true);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/internship');

module.exports.Student = require('./student');

module.exports.Internship = require('./internship');
