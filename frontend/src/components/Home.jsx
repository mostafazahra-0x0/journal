import { useState } from 'react'
import { Link } from 'react-router-dom'
import journalService from '../services/journals'
import JournalForm from './JournalForm'

const Home = ({ journals, setJournals, formatDate }) => {
  const [content, setContent] = useState('')

  const todayJournal = journals.find(
    journal => formatDate(journal.date) === formatDate(new Date())
  )

  const handleSaveJournal = async (event) => {
    event.preventDefault()
    if (!content.trim()) return
    try {
      if (todayJournal) {
        const updated = await journalService.update(todayJournal.id, content)
        setJournals(journals.map(journal =>
          journal.id === todayJournal.id ? updated : journal
        ))
      } else {
        const created = await journalService.create(content)
        setJournals(journals.concat(created))
      }
    } catch (error) {
      console.log('Error saving journal:', error)
    }
  }

  return (
    <div>
      <JournalForm
        content={content || (todayJournal ? todayJournal.content : '')}
        handleContentChange={({ target }) => setContent(target.value)}
        handleSubmit={handleSaveJournal}
      />
      <ul>
        {journals.map(journal => (
          <li key={journal.id}>
            <strong>{formatDate(journal.date)}</strong> {journal.content}{' '}
            <Link to={`/journal/${journal.id}`}>تعديل</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home