import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails)
    user.error ? console.log(user.error) : setUser(user)
  }

  if (user === null)
    return(<Login onLogin={handleLogin}/>)

  return (
      <div>
        <h2>blogs</h2>
        <p>Hello {user.name}!</p>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )}
      </div>
  )
}

export default App