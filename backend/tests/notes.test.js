const request = require('supertest');
const app = require('../src/app');
const db = require('./helpers/db');

const registerAndGetToken = async (email) => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Exam User',
    email,
    password: 'Password123'
  });

  return res.body.token;
};

describe('Notes API', () => {
  beforeAll(async () => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.JWT_EXPIRES_IN = '1d';
    await db.connect();
  });

  afterEach(async () => {
    await db.clear();
  });

  afterAll(async () => {
    await db.close();
  });

  test('creates note for authenticated user', async () => {
    const token = await registerAndGetToken('notes@example.com');

    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Product Team Meeting',
        description: 'Monthly agenda and updates',
        status: 'monthly'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Product Team Meeting');
  });

  test('returns only current user notes', async () => {
    const tokenA = await registerAndGetToken('a@example.com');
    const tokenB = await registerAndGetToken('b@example.com');

    await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ title: 'User A Note', description: 'A desc', status: 'weekly' });

    await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ title: 'User B Note', description: 'B desc', status: 'weekly' });

    const res = await request(app).get('/api/notes').set('Authorization', `Bearer ${tokenA}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('User A Note');
  });
});
