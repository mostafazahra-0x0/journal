const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/User')
const Journal = require('../models/Journal')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

let token
beforeEach(async () => {
  await User.deleteMany({})
  await Journal.deleteMany({})
  const user = await api
    .post('/api/users')
    .send({ username: 'testuser', password: 'testpassword' })
    .expect(201)
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpassword' })
    .expect(200)
  token = loginResponse.body.token
})
describe('GET /api/journals', () => {
})