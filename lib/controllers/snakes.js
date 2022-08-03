const { Router } = require('express');

const Snake = require('../models/Snake');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Snake.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  }).get('/', async (req, res, next) => {
    try {
      const data = await Snake.getAll();
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Snake.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
