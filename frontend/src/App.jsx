import { useState } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import journalService from './services/journals'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    } catch  {
      console.log('wrong credentials')
    }
  }
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
        <h1> hi {user.name} how are you ?</h1>
      )}
    </div>  
  )
}

export default App