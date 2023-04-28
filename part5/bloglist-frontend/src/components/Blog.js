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

  const addedByUser = JSON.parse(window.localStorage.getItem('user'))
    && blog.user.username === JSON.parse(window.localStorage.getItem('user')).username

  return (
    <div className="blog" style={blogStyle}>
      <div className='blogTitle'>
        {blog.title} {blog.author}
      </div>
      { !visible ?
        <button onClick={() => setVisible(!visible)}>view</button> :
        <div>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>likes {blog.likes} <button onClick={like}>like</button></div>
          <div className='blogUser'>{blog.user.name}</div>
          { addedByUser && <div><button onClick={removeBlog}>remove</button></div> }
        </div>}
    </div>
  )
}

export default Blog