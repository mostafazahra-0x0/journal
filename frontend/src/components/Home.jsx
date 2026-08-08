import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import journalService from '../services/journals'
import JournalForm from './JournalForm'

const Home = ({ journals, setJournals, formatDate }) => {
  const [content, setContent] = useState('')
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef(null)

  const todayKey = formatDate(new Date())

  const todayJournal = journals.find(
    journal => formatDate(journal.date) === todayKey
  )

  const effectiveContent = content || (todayJournal ? todayJournal.content : '')

  const flashToast = () => {
    setShowToast(true)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2800)
  }

  const handleSaveJournal = async (event) => {
    event.preventDefault()
    const text = effectiveContent.trim()
    if (!text) return
    try {
      if (todayJournal) {
        const updated = await journalService.update(todayJournal.id, text)
        setJournals(journals.map(journal =>
          journal.id === todayJournal.id ? updated : journal
        ))
      } else {
        const created = await journalService.create(text)
        setJournals(journals.concat(created))
      }
      flashToast()
    } catch (error) {
      console.log('Error saving journal:', error)
    }
  }

  return (
    <div className="page">
      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Today&rsquo;s page</h2>
          <span className="date-chip">{todayKey}</span>
        </div>
        <JournalForm
          content={effectiveContent}
          handleContentChange={({ target }) => setContent(target.value)}
          handleSubmit={handleSaveJournal}
        />
        {showToast && (
          <p className="toast" role="status">
            <span aria-hidden="true">&#10003;</span> Inscribed &mdash; the ledger is current
          </p>
        )}
      </section>

      <section className="entries">
        <div className="entries-head">
          <h2 className="entries-title">Past editions</h2>
          <span className="entries-count">
            {journals.length} {journals.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        {journals.length === 0 ? (
          <div className="empty-state">
            No pages written yet &mdash; the ledger awaits its first line.
          </div>
        ) : (
          <ul className="entry-list">
            {journals.map((journal, index) => (
              <li
                key={journal.id}
                className="entry"
                style={{ animationDelay: `${Math.min(index * 0.06, 0.36)}s` }}
              >
                <div className="entry-head">
                  <span className="entry-date">{formatDate(journal.date)}</span>
                  {formatDate(journal.date) === todayKey && (
                    <span className="stamp">Today</span>
                  )}
                </div>
                <p className="entry-text">{journal.content}</p>
                <Link to={`/journal/${journal.id}`} className="entry-edit">
                  Retouch entry <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Home