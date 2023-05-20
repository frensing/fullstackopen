import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const blogFromRef = useRef()
  const toggleForm = () => blogFromRef.current.toggleVisibility()

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFromRef}>
            <BlogForm toggle={toggleForm} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
