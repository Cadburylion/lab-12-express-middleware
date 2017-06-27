'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);

  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.indexOf('duplicate key') > -1)
    return res.sendstatus(409);

  if(err.message.toLowerCase().includes('object failed'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
