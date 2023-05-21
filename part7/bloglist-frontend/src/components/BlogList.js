import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </div>
  )
}

export default BlogList
