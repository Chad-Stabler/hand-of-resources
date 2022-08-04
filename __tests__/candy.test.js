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
  it('post /candy should insert a new candy into the database', async () => {
    const newCandy = {
      name: 'Cookie Dough Bites',
      type: 'Cookie Dough',
      consistency: 'Chewy'
    };
    const resp = await request(app).post('/candy').send(newCandy);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCandy
    });
  });
  it('put /candy/:id should update a single candy', async () => {
    const resp = await request(app).put('/candy/1').send({ type: 'Popper' });

    expect(resp.status).toBe(200);
    expect(resp.body.type).toBe('Popper');
  });
  afterAll(() => {
    pool.end();
  });
});
