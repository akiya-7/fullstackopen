import {useState} from 'react';

const Login = ( {onLogin} ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    const clearFields = () => {
        setUsername('')
        setPassword('')
    }

    const handleUsernameInput = (e) => {
        console.log("Username:", e.target.value)
        setUsername(e.target.value)
    }
    const handlePasswordInput = (e) => {
        console.log("Password", e.target.value)
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin( {username: username, password: password} )
        clearFields()
    }

  return (
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>log in to application</h2>
        <p>
          username: <input id="username" type="text" value={username}
                           onChange={handleUsernameInput} required /> <br/>
          password: <input id="password" type="password" required
                           value={password} onChange={handlePasswordInput}/>
        </p>
        <button type="submit">log in</button>
      </form>
  )
}

export default Login
