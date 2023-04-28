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

  const checkBlogUser = () => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('user'))
    if (!loggedInUser) { return false }
    return blog.user && blog.user.username === loggedInUser.username
  }

  const addedByUser = checkBlogUser()

  return (
    <div className="blog" style={blogStyle}>
      <div className='blogTitle'>
        {blog.title} {blog.author}
      </div>
      { !visible ?
        <button className='blogDetailsBtn' onClick={() => setVisible(!visible)}>view</button> :
        <div>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>likes {blog.likes} <button className='blogLikeBtn' onClick={like}>like</button></div>
          <div className='blogUser'>{blog.user.name}</div>
          { addedByUser && <div><button onClick={removeBlog}>remove</button></div> }
        </div>}
    </div>
  )
}

export default Blog