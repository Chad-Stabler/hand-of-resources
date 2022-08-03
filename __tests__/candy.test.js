const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get /candy should return all candy', async () => {
    const resp = await request(app).get('/candy');

    expect(resp.status).toBe(200);
    expect(resp.body.length).toEqual(5);
  });
  it('get candy/id should return a single candy datapoint', async () => {
    const resp = await request(app).get('/candy/1');

    expect(resp.body).toHaveProperty('name', 'Jolly Ranchers');
  });
  afterAll(() => {
    pool.end();
  });
});
