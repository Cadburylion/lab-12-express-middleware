'use strict';

const mongoose = require('mongoose');

const shipSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  captain: {type: String, required: true},
  cannons: {type: Number, required: true},
  timestamp: {type: Date, default: Date.now},
});

// add instance methods to shipSchema
// add validation
// add hooks to shipSchema

const Ship = module.exports = mongoose.model('ship', shipSchema);

// add static methods to Ship constructor
