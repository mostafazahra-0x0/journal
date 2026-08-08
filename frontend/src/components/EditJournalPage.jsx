import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import JournalForm from './JournalForm'
import journalService from '../services/journals'
import '../index.css'

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
  const [content, setContent] = useState('')

  useEffect(() => {
    if (journal) {
      setContent(journal.content)
    }
  }, [journal])

  if (!journal) {
    return <p>journal not found</p>
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!content.trim()) return
    await onSave(journal.id, content)
    navigate('/')
  }

  return (
    <div>
      <h2>تعديل جورنال تاريخ {formatDate(journal.date)}</h2>
      <JournalForm
        content={content}
        handleContentChange={({ target }) => setContent(target.value)}
        handleSubmit={handleSubmit}
      />
      <button onClick={() => navigate('/')}>cancel</button>
    </div>
  )
}

export default EditJournalPage