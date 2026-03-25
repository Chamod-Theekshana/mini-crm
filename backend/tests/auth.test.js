const request = require('supertest');
const app = require('../src/app');
const db = require('./helpers/db');

describe('Auth API', () => {
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

  test('registers user and returns token', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Exam User',
      email: 'exam@example.com',
      password: 'Password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('exam@example.com');
    expect(res.body.token).toBeDefined();
  });

  test('logs in existing user and returns token', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Exam User',
      email: 'exam@example.com',
      password: 'Password123'
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'exam@example.com',
      password: 'Password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('returns profile for authenticated user', async () => {
    const register = await request(app).post('/api/auth/register').send({
      name: 'Exam User',
      email: 'exam@example.com',
      password: 'Password123'
    });

    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${register.body.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Exam User');
    expect(res.body.password).toBeUndefined();
  });
});
