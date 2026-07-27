import { useEffect } from 'react'
import loginService from './services/login'

function App() {
  useEffect(() => {
    const testLogin = async () => {
      try {
        const user = await loginService.login({
          username: 'mostafazahra',
          password: 'mostafa101',
        })
        console.log('Login successful:', user)
      } catch (error) {
        console.log('Login failed:', error)
      }
    }
    testLogin()
  }, [])

  return <div>Check the console</div>
}

export default App