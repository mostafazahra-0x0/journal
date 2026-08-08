import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import JournalForm from './JournalForm'

const formatDate = (dateString) => {
  if (!dateString) return ''
  const dateObj = new Date(dateString)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}

const EditJournalPage = ({ journals, onSave }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const journal = journals.find(j => j.id === id)
  const [lastJournal, setLastJournal] = useState(journal)
  const [content, setContent] = useState(journal ? journal.content : '')

  if (journal !== lastJournal) {
    setLastJournal(journal)
    setContent(journal.content)
  }

  if (!journal) {
    return (
      <p className="not-found">
        Journal not found. <Link to="/">Return to the ledger</Link>
      </p>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!content.trim()) return
    await onSave(journal.id, content)
    navigate('/')
  }

  return (
    <div className="page">
      <div className="edit-head">
        <h2>
          Retouch the page of <em>{formatDate(journal.date)}</em>
        </h2>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>
          <span aria-hidden="true">&larr;</span> Back
        </button>
      </div>
      <section className="panel">
        <div className="panel-head">
          <span className="date-chip">{formatDate(journal.date)}</span>
          <span className="stamp">Amending</span>
        </div>
        <JournalForm
          content={content}
          handleContentChange={({ target }) => setContent(target.value)}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  )
}

export default EditJournalPage