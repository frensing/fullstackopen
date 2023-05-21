import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const navbar = {
    background: 'lightgrey',
    padding: 10,
    marginBottom: 5,
  }

  const padding = {
    paddingRight: 10,
  }

  return (
    <div style={navbar}>
      <Link to={'/'} style={padding}>
        blogs
      </Link>
      <Link to={'/users'} style={padding}>
        users
      </Link>
      {user && <>{user.name} logged in </>}
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navigation
