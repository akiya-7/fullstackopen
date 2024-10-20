import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails)
    if (user.error) {
      console.log(user.error)
      return
    }
    window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    setUser(user)
    blogService.setToken(user.token)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null)
    return(<Login onLogin={handleLogin}/>)

  const handleNewBlog = async (newBlog) => {
    const response = await blogService.postBlog(newBlog, { headers: { Authorization: `Bearer ${user}`}})
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  return (
      <div>
        <h2>blogs</h2>
        <p>
          Hello {user.name}! <button id="logout" onClick={() => {handleLogout()}}>Logout</button>
        </p>

        <AddBlog onNewBlog={handleNewBlog}/>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )}
      </div>
  )
}

export default App