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
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .send({name: 'Little Big', type: 'High Ship', cannons: 6})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .send({type: 'High Ship', captain: 'Adeline', cannons: 6})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });


  describe('testing GET /api/ships/:id', () => {

    afterEach(() => Ship.remove({}));
    beforeEach(() => {
      return new Ship({
        name: 'Little Big',
        type: 'High Ship',
        captain: 'Adeline',
        cannons: 6,
      })
      .save()
      .then(ship => {
        tempShip = ship;
      });
    });
    it('should respond with a ship and 200 status', () => {
      console.log('tempShip', tempShip);
      return superagent.get(`${API_URL}/api/ships/${tempShip._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempShip._id);
        expect(res.body.name).toEqual(tempShip.name);
        expect(res.body.type).toEqual(tempShip.type);
        expect(res.body.captain).toEqual(tempShip.captain);
        expect(res.body.cannons).toEqual(tempShip.cannons);
        expect(new Date(res.body.timestamp)).toEqual(tempShip.timestamp);
      });
    });
    it('should respond with a 404 "not found" status', () => {
      return superagent.get(`${API_URL}/api/ships/5952e3da375ec66a146b82d6`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });


  describe('testing PUT /api/ships/:id', () => {
    afterEach(() => Ship.remove({}));
    beforeEach(() => {
      return new Ship({
        name: 'Ragepounder',
        type: 'Pirate Ship',
        captain: 'Gaeno',
        cannons: 32,
      })
      .save()
      .then(ship => {
        tempShip = ship;
      });
    });
    it('should respond with an updated ship and 200 status', () => {
      return superagent.put(`${API_URL}/api/ships/${tempShip._id}`)
      .send({name: 'The SS Rage'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempShip._id);
        expect(res.body.name).toEqual('The SS Rage');
        expect(res.body.type).toEqual('Pirate Ship');
        expect(res.body.captain).toEqual('Gaeno');
        expect(res.body.cannons).toEqual(32);
      });
    });
    it('should respond with a 400 invalid body', () => {
      return superagent.put(`${API_URL}/api/ships/${tempShip._id}`)
      .send({cannons: '100'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404 invalid id', () => {
      superagent.get(`${API_URL}/api/ships/5952e3da375ec66a146b82d6`)
      .send({cannons: 5000})
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });


  describe('testing DELETE /api/ships/:id', () => {
    afterEach(() => Ship.remove({}));
    beforeEach(() => {
      return new Ship({
        name: 'Ragepounder',
        type: 'Pirate Ship',
        captain: 'Gaeno',
        cannons: 1000,
      })
      .save()
      .then(ship => {
        tempShip = ship;
      });
    });

    it('should sink a ship and return 204 valid id', () => {
      return superagent.delete(`${API_URL}/api/ships/${tempShip._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
    it('should return 404 invalid id', () => {
      return superagent.delete(`${API_URL}/api/ships/5952e3da375ec66a146b82d6`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
