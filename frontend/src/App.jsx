import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import journalService from './services/journals'
import JournalForm from './components/JournalForm'
const formatDate = (dateString) => {
  if (!dateString) return ''
  const dateObj = new Date(dateString)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [journals, setJournals] = useState([])
  const [content, setContent] = useState('')
  const [selectedJournal, setSelectedJournal] = useState(null)
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON)
      journalService.setToken(userObj.token)
      return userObj
    }
    return null
  })
  const todayJournal = journals.find(
    journal => formatDate(journal.date) === formatDate(new Date())
  )
  const activeJournal = selectedJournal || todayJournal
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)
      journalService.setToken(loggedInUser.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }
  const handleSaveJournal = async (event) => {
    event.preventDefault()
    if (!content.trim()) return
    try {
      if (activeJournal) {
        const updated = await journalService.update(activeJournal.id, content)
        setJournals(journals.map(journal =>
          journal.id === activeJournal.id ? updated : journal
        ))
      } else {
        const created = await journalService.create(content)
        setJournals(journals.concat(created))
      }
      setSelectedJournal(null)
    } catch (error) {
      console.log('Error saving journal:', error)
    }
  }
  const handleOpenJournal = (journal) => {
    setSelectedJournal(journal)
    setContent(journal.content)
  }
  const handleCancelEdit = () => {
    setSelectedJournal(null)
    setContent(todayJournal ? todayJournal.content : '')
  }
  useEffect(() => {
    if (user === null) {
      setJournals([])
      setContent('')
    } else {
      journalService.getAll().then(fetchedJournals => {
        setJournals(fetchedJournals)
        const todayJournal = fetchedJournals.find(
          journal => formatDate(journal.date) === formatDate(new Date())
        )
        if (todayJournal) {
          setContent(todayJournal.content)
        }
      })
    }
  }, [user])
  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <h1>hi {user.name} how are you ?</h1>
          {selectedJournal && (
              <p>
              editing {formatDate(selectedJournal.date)}
              <button onClick={handleCancelEdit}>cancel</button>
            </p>
          )}
          <JournalForm 
            content={content} 
            handleContentChange={({ target }) => setContent(target.value)}
            handleSubmit={handleSaveJournal}
          />
          <ul>
            {journals.map(journal => (
              <li key={journal.id || journal._id}>
                <strong>{formatDate(journal.date)}</strong> {journal.content}{' '}
                <button onClick={() => handleOpenJournal(journal)}>edit</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
export default App