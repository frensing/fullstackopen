import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser, logout } from './reducers/userReducer'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import { initializeUsers } from './reducers/usersReducer'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const loggedInUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const match = useMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  console.log(users)

  return (
    <div>
      <Notification />
      {!loggedInUser ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {loggedInUser.name} logged in{' '}
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
          <Routes>
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/users" element={<UserView />} />
            <Route path="/" element={<BlogView />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
