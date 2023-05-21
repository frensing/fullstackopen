import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser, logout } from './reducers/userReducer'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  console.log('app')

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
          <Routes>
            <Route path="/users" element={<UserView />} />
            <Route path="/" element={<BlogView />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
