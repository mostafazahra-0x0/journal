const { test, beforeEach, describe, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/User')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
beforeEach(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send({ username: 'testuser', password: 'testpassword' })
    .expect(201)
})
describe('login tests', () => {
  test('succeeds with correct credentials', async () => {

    const response = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.token)
    assert.strictEqual(response.body.username, 'testuser')
   
  })
  test('fails with incorrect data', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .expect(401)
    
    assert.strictEqual(response.body.error, 'invalid username or password')
  })
  test('fails with missing password', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'testuser' })
      .expect(400)
  })
  test('fails with missing username', async () => {
    const response = await api
      .post('/api/login')
      .send({ password: 'testpassword' })
      .expect(400)
  })  
})




after(async () => {
  await mongoose.connection.close()
})