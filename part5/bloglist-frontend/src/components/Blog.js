import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, like }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  
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
        </div>}
    </div>
  )
}

export default Blog