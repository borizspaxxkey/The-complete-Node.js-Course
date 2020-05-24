const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('5eca1d42182fe193908a5c2a');

console.log(isValid)