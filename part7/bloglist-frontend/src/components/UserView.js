import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserView = () => {
  const users = useSelector((state) => state.users)

  return (
    <>
      <h4>Users</h4>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserEntry key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
}

const UserEntry = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
)

export default UserView
