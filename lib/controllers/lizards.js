const { Router } = require('express');

const Lizard = require('../models/Lizard');

module.exports = Router()
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
