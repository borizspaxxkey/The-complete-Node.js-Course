const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(config.get('db'))
    .then(() => winston.info('Connected to MongoDB...'))
}