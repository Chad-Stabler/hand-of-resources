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
  it('get snakes/id should return a single snake datapoint', async () => {
    const resp = await request(app).get('/snakes/1');

    expect(resp.body).toHaveProperty('common_name', 'Garter Snake');
  });
  it('post /snakes should put a new snake into the database', async () => {
    const newSnake = {
      common_name: 'Boa Constrictor',
      avg_lifespan: 16,
      is_danger_noodle: true
    };
    const resp = await request(app).post('/snakes').send(newSnake);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newSnake
    });
  });
  afterAll(() => {
    pool.end();
  });
});
