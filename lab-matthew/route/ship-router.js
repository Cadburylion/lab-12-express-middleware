'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

// app modules
const Ship = require('../model/ship.js');

// module logic
const shipRouter = module.exports = new Router();

shipRouter.post('/api/ships', jsonParser, (req, res, next) => {
  new Ship(req.body)
  .save()
  .then(ship => res.json(ship))
  .catch(next);
});

shipRouter.get('/api/ships/:id', (req, res, next) => {
  console.log('GET /api/ships/:id');
  Ship.findById(req.params.id)
  .then(ship => res.json(ship))
  .catch(next);
});

shipRouter.put('/api/ships/:id', jsonParser, (req, res, next) => {
  Ship.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(ship => res.json(ship))
  .catch(next);
});

shipRouter.delete('/api/ships/:id', (req, res, next) => {
  Ship.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
