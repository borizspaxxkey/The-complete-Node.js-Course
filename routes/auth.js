const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid Email or Password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid Email or Password.')

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).required().max(255).email(),
    password: Joi.string().min(5).required().max(255),
  };

  return Joi.validate(req, schema);
}
module.exports = router;