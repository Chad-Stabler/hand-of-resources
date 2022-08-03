const { Router } = require('express');

const Candy = require('../models/Candy');


module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Candy.getAll();
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
