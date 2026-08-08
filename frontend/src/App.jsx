import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import journalService from './services/journals'
import Home from './components/Home'
import EditJournalPage from './components/EditJournalPage'
import './App.css'

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
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON)
      journalService.setToken(userObj.token)
      return userObj
    }
    return null
  })

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

  const updateJournalInList = (updatedJournal) => {
    setJournals(journals.map(journal =>
      journal.id === updatedJournal.id ? updatedJournal : journal
    ))
  }

  useEffect(() => {
    if (user !== null) {
      journalService.getAll().then(fetchedJournals => {
        setJournals(fetchedJournals)
      })
    }
  }, [user])

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  return (
    <main className="arena">
      <header className="masthead">
        <p className="kicker">
          The daily ledger &middot; keeper: <strong>{user.name || user.username}</strong>
        </p>
        <p className="ornament" aria-hidden="true">✦ ✧ ✦</p>
        <div className="masthead-rule" aria-hidden="true" />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              journals={journals}
              setJournals={setJournals}
              formatDate={formatDate}
            />
          }
        />
        <Route
          path="/journal/:id"
          element={
            <EditJournalPage
              journals={journals}
              onSave={updateJournalInList}
            />
          }
        />
      </Routes>
    </main>
  )
}

export default App