'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

// app modules
const Ship = require('../model/ship.js');
const server = require('../lib/server.js');


let tempShip;
const API_URL = process.env.API_URL;

describe('testing ship router', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/ships', () => {
    after(() => Ship.remove({}));

    let data = {
      name: 'Little Big',
      type: 'High Ship',
      captain: 'Adeline',
      cannons: 6,
    };


    it('should respond with a ship and 200 status', () => {
      console.log('DATA', data);
      return superagent.post(`${API_URL}/api/ships`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.timestamp).toExist();
        expect(res.body.name).toEqual(data.name);
        expect(res.body.type).toEqual(data.type);
        expect(res.body.captain).toEqual(data.captain);
        expect(res.body.cannons).toEqual(data.cannons);
      });
    });

    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });


  });

});
