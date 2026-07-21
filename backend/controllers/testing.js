const router = require('express').Router()
const Journal = require('../models/Journal')
const User = require('../models/User')
router.post('/reset', async (request, response) => {
  await Journal.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router
