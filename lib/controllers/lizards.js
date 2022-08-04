const { Router } = require('express');

const Lizard = require('../models/Lizard');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Lizard.getById(req.params.id);
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
      const data = await Lizard.getAll();
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
