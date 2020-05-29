const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  mongoose.connect('mongodb+srv://spaxxkey:91408916B.c@cluster0-sc4m5.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => winston.info('Connected to MongoDB...'))
}