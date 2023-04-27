import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      notify({
        text: 'Successfully logged in!',
        type: 'info'
      })
    } catch (exception) {
      notify({
        text: 'Wrong credentials',
        type: 'error'    
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    notify({
      text: 'Successfully logged out!',
      type: 'info'
    })
  }

  const addBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    blogFromRef.current.toggleVisibility()

    notify({
      text: `new blog "${blog.title}" by ${blog.author} added!`,
      type: 'info'
    })
  }

  const addLike = async (blog) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const bloglist = () => (
    <>
      { blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          like={() => addLike(blog)}/>
      )}
    </>
  )

  return (
    <div>
      <Notification message={notification} />
      { !user ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFromRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {bloglist()}
        </div> }
    </div>
  )
}

export default App