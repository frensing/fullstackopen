import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const BlogView = () => {
  const blogFromRef = useRef()
  const toggleForm = () => blogFromRef.current.toggleVisibility()

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFromRef}>
        <BlogForm toggle={toggleForm} />
      </Togglable>
      <BlogList />
    </>
  )
}

export default BlogView
