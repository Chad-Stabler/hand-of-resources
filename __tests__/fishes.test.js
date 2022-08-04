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
  it('post /fishes should insert a new fish into the database', async () => {
    const newFish = {
      name: 'Sheepshead',
      size: '3 feet',
      catch_difficulty: 'Medium'
    };
    const resp = await request(app).post('/fishes').send(newFish);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newFish
    });
  });
  it('put /fishes/:id should update a single fish', async () => {
    const resp = await request(app).put('/fishes/1').send({ size: '4 feet' });

    expect(resp.status).toBe(200);
    expect(resp.body.size).toBe('4 feet');
  });
  it('delete fishes/id should remove a fish from the database', async () => {
    const resp = await request(app).delete('/fishes/3');
    expect(resp.status).toBe(200);

    const newResp = await request(app).get('/fishes/3');
    expect(newResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});

