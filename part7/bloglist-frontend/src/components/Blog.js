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

  const addedByUser = blog.user && blog.user.username === user.username

  return (
    <div className="blog">
      <h4 className="blogTitle">
        {blog.title} - {blog.author}
      </h4>
      <div>
        <a className="blogUrl" href={blog.url}>
          {blog.url}
        </a>
        <div className="blogLikes">
          likes {blog.likes}{' '}
          <button className="blogLikeBtn" onClick={onLike}>
            like
          </button>
        </div>
        <div className="blogUser">added by {blog.user.name}</div>
        {addedByUser && (
          <div>
            <button onClick={onRemove}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
