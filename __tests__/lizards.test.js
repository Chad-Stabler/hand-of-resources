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
  it('post /lizards should insert a new lizard into the database', async () => {
    const newLiz = {
      name: 'Snakeheaded Jimmy',
      avg_size: '26 feet',
      handleable: false
    };
    const resp = await request(app).post('/lizards').send(newLiz);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newLiz
    });
  });
  it('put /lizards/:id should update a single lizard', async () => {
    const resp = await request(app).put('/lizards/1').send({ avg_size: '10^8 square nautical miles' });

    expect(resp.status).toBe(200);
    expect(resp.body.avg_size).toBe('10^8 square nautical miles');
  });
  it('delete lizards/id should remove a lizard from the database', async () => {
    const resp = await request(app).delete('/lizards/1');
    expect(resp.status).toBe(200);

    const newResp = await request(app).get('/lizards/1');
    expect(newResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
