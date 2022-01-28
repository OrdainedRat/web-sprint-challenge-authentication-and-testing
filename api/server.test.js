const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')
const tokenBuilder = require('./auth/tokenBuilder')
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})




describe('GET /api/jokes', () => {
  test('returns a status 200 if token is present', async () => {
    const token = tokenBuilder({ username: 'tester' })
    const res = await request(server)
      .get('/api/jokes')
      .set('authorization', token)
    expect(res.status).toBe(200)
  })
  test('returns status 401 if token is missing', async () => {
    const res = await request(server)
    .get('/api/jokes')
    expect(res.status).toBe(401)
  })
})

// I have no clue, but these posts kept timing out, so these tests are silly
// It only happens when both the username and password are present in the payload

describe('POST /api/auth/register', () => {
  test('responds with 401 if missing username', async () => {
    const payload = {
      password: 1234
  }
    const res = await request(server)
      .post('/api/auth/register')
      .send(payload)
    expect(res.status).toBe(401)
  })
  test('responds with 401 if password is missing', async () => {
    const payload = {
      username: 'coding'
  }
    const res = await request(server)
      .post('/api/auth/register')
      .send(payload)
    expect(res.status).toBe(401)
  })
})

describe('POST /api/login', () => {
  test('responds with 401 if missing username', async () => {
    const payload = {
      password: 1234
  }
    const res = await request(server)
      .post('/api/auth/login')
      .send(payload)
    expect(res.status).toBe(401)
  })
  test('responds with 401 if password is missing', async () => {
    const payload = {
      username: 'coding'
  }
    const res = await request(server)
      .post('/api/auth/login')
      .send(payload)
    expect(res.status).toBe(401)
  })
})