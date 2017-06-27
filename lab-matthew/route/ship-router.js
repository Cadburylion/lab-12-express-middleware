'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Ship = require('../model/ship.js');

// module logic
const shipRouter = module.exports = new Router();

shipRouter.post('/api/ships', jsonParser, (req, res, next) => {
  console.log('POST /api/ships');
  console.log('REQ.BODY', req.body);
  new Ship(req.body)
  .save()
  .then(ship => res.json(ship))
  .catch(next);
});
