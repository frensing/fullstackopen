import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const onLike = () => {
    dispatch(likeBlog(blog))
  }

  const onRemove = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      dispatch(
        setNotification({
          text: `blog "${blog.title}" removed`,
          type: 'info',
        })
      )
    } else {
      dispatch(
        setNotification({
          text: 'deletion aborted',
          type: 'warn',
        })
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const addedByUser = blog.user && blog.user.username === user.username

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogTitle">
        {blog.title} {blog.author}
      </div>
      {!visible ? (
        <button className="blogDetailsBtn" onClick={() => setVisible(!visible)}>
          view
        </button>
      ) : (
        <div>
          <div className="blogUrl">{blog.url}</div>
          <div className="blogLikes">
            likes {blog.likes}{' '}
            <button className="blogLikeBtn" onClick={onLike}>
              like
            </button>
          </div>
          <div className="blogUser">{blog.user.name}</div>
          {addedByUser && (
            <div>
              <button onClick={onRemove}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
