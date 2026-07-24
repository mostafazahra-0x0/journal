const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/User')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
beforeEach(async () => {
  await User.deleteMany({})
})
describe('User API', () => {
  test('user can be created', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'testpassword',
    }).expect(201)
    assert.strictEqual(await User.countDocuments({}), 1)
  })
  test('username already taken', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'testpassword',
    }).expect(201)
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'testpassword',
    }).expect(400)
    assert.strictEqual(await User.countDocuments({}), 1)
  })
  test('creation fails with proper statuscode and message if password is too short', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'te',
    }).expect(400)
    assert.strictEqual(await User.countDocuments({}), 0)
  })
  after(() => mongoose.connection.close())
})
