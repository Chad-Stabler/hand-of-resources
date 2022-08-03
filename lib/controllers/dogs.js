const { Router } = require('express');

const Dog = require('../models/Dog');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Dog.getById(req.params.id);
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
      const data = await Dog.getAll();
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
      const data = await Dog.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
