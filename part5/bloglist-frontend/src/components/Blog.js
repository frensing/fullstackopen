import { useState } from 'react'

const Blog = ({ blog, like, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const addedByUser = blog.user.username === JSON.parse(window.localStorage.getItem('user')).username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      { !visible ?
        <button onClick={() => setVisible(!visible)}>view</button> :
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={like}>like</button></div>
          <div>{blog.user.name}</div>
          { addedByUser && <div><button onClick={removeBlog}>remove</button></div> }
        </div>}
    </div>
  )
}

export default Blog