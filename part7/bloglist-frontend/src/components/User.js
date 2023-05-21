const User = ({ user }) => {
  return (
    <>
      <h4>{user.name}</h4>
      added blogs
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
