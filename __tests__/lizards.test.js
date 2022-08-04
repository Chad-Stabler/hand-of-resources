const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get /lizards should return all lizards', async () => {
    const resp = await request(app).get('/lizards');

    expect(resp.status).toBe(200);
    expect(resp.body.length).toEqual(4);
  });
  it('get lizards/id should return a single lizard datapoint', async () => {
    const resp = await request(app).get('/lizards/1');

    expect(resp.body).toHaveProperty('name', 'Bearded Dragon');
  });
  afterAll(() => {
    pool.end();
  });
});
