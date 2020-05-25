const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 5
  },
  email: {
    type: String,
    required: true,
    max: 50,
    min: 5
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 255,
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;

}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).required().max(50),
    email: Joi.string().min(5).required().max(255).email(),
    password: Joi.string().min(5).required().max(255),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;