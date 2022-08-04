const { Router } = require('express');

const Fish = require('../models/Fish');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Fish.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Fish.getAll();
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
