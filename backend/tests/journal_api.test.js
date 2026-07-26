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
  test('fails with status 401 if token is not provided', async () => {
    await api.get('/api/journals').expect(401)
  })
  test('succeeds in returning journals when token is provided', async () => {
    const response = await api
      .get('/api/journals')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.strictEqual(response.body.length, 0)
  })
})
describe('POST /api/journals', () => {
  test('succeeds in creating a journal when token is provided', async () => {
    const response = await api
      .post('/api/journals')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Journal', content: 'Test content' })
      .expect(201)
    assert.strictEqual(response.body.name, 'Test Journal')
    assert.strictEqual(response.body.content, 'Test content')
    
  })
  test('fails with status 401 if token is not provided', async () => {
    await api
      .post('/api/journals')
      .send({ name: 'Test Journal', content: 'Test content' })
      .expect(401)
  })
})
describe('journal ownership checks', () => {
  let otherUserToken
  let journalId

  beforeEach(async () => {
    const journalResponse = await api
      .post('/api/journals')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'testjournal', content: 'testcontent' })
      .expect(201)
    journalId = journalResponse.body.id
    await api
      .post('/api/users')
      .send({ username: 'otheruser', password: 'otherpassword' })
      .expect(201)
    const otherLoginResponse = await api
      .post('/api/login')
      .send({ username: 'otheruser', password: 'otherpassword' })
      .expect(200)
    otherUserToken = otherLoginResponse.body.token
  })

  test('fails with status 403 if user tries to access another user\'s journal', async () => {
    await api
      .get(`/api/journals/${journalId}`)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .expect(403)
  })
  test('fails with status 403 if user tries to update another user\'s journal', async () => {
    await api
      .put(`/api/journals/${journalId}`)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({ name: 'hacked', content: 'hacked content' })
      .expect(403)
  })
})





after(async () => {
  await mongoose.connection.close()
})