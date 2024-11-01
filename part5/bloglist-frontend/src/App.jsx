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

  const loadBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
  }

  useEffect(() => {
    loadBlogs()
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
      loadBlogs()
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
    loadBlogs()
    console.log(response);
  }

  const handleBlogDelete = async (blogToDelete) => {
    console.log("Button pressed")
    const confirmMessage = `Remove blog: ${blogToDelete.title} by ${blogToDelete.author}`
    if (confirm(confirmMessage)) {
      try {
        await blogService.deleteBlog(blogToDelete)
        displayAlert(`${blogToDelete.title} has now been deleted.`, "success")
      } catch (error) {
        displayAlert(error.response.data.message, 'error')
      } finally {
        loadBlogs()
      }
    }
  }

  return <div>
    <h2>blogs</h2>
    <AlertMessage type={alertType} message={alertMessage}/>
    <p>
      Hello {user.name}! <button id="logout" onClick={() => {handleLogout()}}>Logout</button>
    </p>

    <Toggleable buttonLabel="New Blog" ref={addBlogRef}>
      <AddBlog onNewBlog={handleNewBlog}/>
    </Toggleable>

    <div id="blog-list">
      {blogs
      .sort((a,b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} user={user}
              onLikeBlog={handleBlogLike} onDeleteBlog={handleBlogDelete}/>
      )}
    </div>

  </div>
}

export default App