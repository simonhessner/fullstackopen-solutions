import { useState } from "react"

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }
  return <div>
    <h2>Login to application</h2>
    <form onSubmit={submit}>
      <p>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </p>
      <p>
        <button type='submit'>Login</button>
      </p>
    </form>
  </div>
}

export default LoginForm