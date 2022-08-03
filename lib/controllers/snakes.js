const { Router } = require('express');

const Snake = require('../models/Snake');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Snake.getAll();
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
