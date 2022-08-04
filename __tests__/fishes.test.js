const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get /fishes should return all fish', async () => {
    const resp = await request(app).get('/fishes');
  
    expect(resp.status).toBe(200);
    expect(resp.body.length).toEqual(4);
  });
  it('get fishes/id should return a single fish datapoint', async () => {
    const resp = await request(app).get('/fishes/1');

    expect(resp.body).toHaveProperty('name', 'Largemouth Bass');
  });
  afterAll(() => {
    pool.end();
  });
});

