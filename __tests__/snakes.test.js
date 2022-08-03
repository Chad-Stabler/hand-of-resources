const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get /snakes should return all snakes', async () => {
    const resp = await request(app).get('/snakes');

    expect(resp.status).toBe(200);
    expect(resp.body.length).toEqual(4);
  });
  afterAll(() => {
    pool.end();
  });
});
