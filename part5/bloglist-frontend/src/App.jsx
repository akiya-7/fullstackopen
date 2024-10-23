import {useState, useEffect, useRef} from 'react';
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import AlertMessage from './components/AlertMessage';
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggleable.jsx';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

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

  const addBlogRef = useRef()

  const displayAlert = (alertMessage, alertType) => {
    setAlertMessage(alertMessage)
    setAlertType(alertType)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  };

  const handleLogin = async (loginDetails) => {
    const user = await loginService.login(loginDetails)
    if (user.error) {
      displayAlert(user.error, 'error')
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
    return(
        <>
          <h2>Log in to application</h2>
          <AlertMessage type={alertType} message={alertMessage}/>
          <Login onLogin={handleLogin}/>
        </>)

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.postBlog(newBlog,
          {headers: {Authorization: `Bearer ${user}`}})
      displayAlert(`A new blog ${response.title} added!`, "success")
       blogService.getAll().then(blogs => setBlogs(blogs))
    } catch (error) {
      if (error.response.data.error === "token has expired") {
        displayAlert("Session expired! Please log-in again.", 'error')
        handleLogout()
      }
      else
        console.log(error)
    } finally {
      addBlogRef.current.toggle()
    }
  }

  const handleBlogLike = async (blogToUpdate) => {
    console.log(blogToUpdate);
    const response = await blogService.likeBlog(blogToUpdate)
    blogService.getAll().then(blogs => setBlogs(blogs))

    console.log(response);
  }

  return (
      <div>
        <h2>blogs</h2>
        <AlertMessage type={alertType} message={alertMessage}/>
        <p>
          Hello {user.name}! <button id="logout" onClick={() => {handleLogout()}}>Logout</button>
        </p>

        <Toggleable buttonLabel="New Blog" ref={addBlogRef}>
          <AddBlog onNewBlog={handleNewBlog}/>
        </Toggleable>

        <div id="blog-list">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} onLikeBlog={handleBlogLike}/>
        )}
        </div>

      </div>
  )
}

export default App