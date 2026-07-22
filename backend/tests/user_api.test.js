const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/User')
const app = require('../app')

const api = supertest(app)
beforeEach(async () => {
  await User.deleteMany({})
})