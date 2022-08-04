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
  afterAll(() => {
    pool.end();
  });
});
