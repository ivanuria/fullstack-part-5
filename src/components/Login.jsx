import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bau', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Invalid username and password')
    }
  }

  return (
    <form className='loginform' id='loginform' onSubmit={doLogin}>
      <div className="form-row">
        <label htmlFor='username'>Username: </label>
        <input id='username' value={username} onChange={ (e) => setUsername(e.target.value) } aria-label='type in your username' />
      </div>
      <div className="form-row">
        <label htmlFor='password'>Password: </label>
        <input id='password' value={password} onChange={ (e) => setPassword(e.target.value) } aria-label='type in your password' type='password' />
      </div>
      <input type='submit' value='Login' />
    </form>
  )
}

export default Login