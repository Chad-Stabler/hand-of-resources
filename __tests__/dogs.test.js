const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get /dogs should return all dogs', async () => {
    const resp = await request(app).get('/dogs');

    expect(resp.status).toBe(200);
    expect(resp.body.length).toEqual(4);
  });
  it('get dogs/id should return a single dog datapoint', async () => {
    const resp = await request(app).get('/dogs/1');

    expect(resp.body).toHaveProperty('name', 'Sully');
  });
  it('post /dogs should insert a new dog into the database', async () => {
    const newDog = {
      name: 'Jimmy',
      age: 4,
      is_cool: true
    };
    const resp = await request(app).post('/dogs').send(newDog);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newDog
    });
  });
  afterAll(() => {
    pool.end();
  });
});
