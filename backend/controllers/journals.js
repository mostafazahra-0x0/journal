const journalsRouter = require('express').Router()
const Journal = require('../models/Journal')
const middleware = require('../utils/middleware')
journalsRouter.use(middleware.tokenExtractor)
journalsRouter.use(middleware.userExtractor)
//get 
journalsRouter.get('/', async (request, response) => {
  const journals = await Journal.find({ user: request.user._id }).populate('user', { username: 1, name: 1 })
  response.json(journals)
})
journalsRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const journal = await Journal.findById(id)

  if (!journal) {
    return response.status(404).json({ error: 'Journal not found' })
  }

  if (journal.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'You are not authorized to this journal' })
  }

  response.json(journal)
})
journalsRouter.post('/', async (request, response) => {
  const { content } = request.body
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingJournal = await Journal.findOne({ user: request.user._id, date: today })
  if (existingJournal) {
    return response.status(400).json({ error: 'Journal already exists for today' })
  }

  const journal = new Journal({
    content,
    user: request.user._id,
  })
  const savedJournal = await journal.save()
  request.user.journals.push(savedJournal._id)
  await request.user.save()
  response.status(201).json(savedJournal)
})

journalsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const journal = await Journal.findById(id)
  if (!journal) {
    return response.status(404).json({ error: 'Journal not found' })
  }
  if (journal.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'You are not authorized to delete this journal' })
  }
  await Journal.findByIdAndDelete(id)
  response.status(204).end()
})

journalsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { content } = request.body
  const journal = await Journal.findById(id)
  if (!journal) {
    return response.status(404).json({ error: 'Journal not found' })
  }
  if (journal.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'You are not authorized to update this journal' })
  }
  if (!content) {
    return response.status(400).json({ error: 'Content is required' })
  }
  const updatedJournal = await Journal.findByIdAndUpdate(
    id,
    { content },
    { new: true, runValidators: true }
  )
  response.json(updatedJournal)
})
module.exports = journalsRouter
