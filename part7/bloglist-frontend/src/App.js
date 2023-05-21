import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const loggedInUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null

  return (
    <div>
      <Navigation />
      <Notification />
      {!loggedInUser ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          <Routes>
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/users" element={<UserView />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/" element={<BlogView />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
