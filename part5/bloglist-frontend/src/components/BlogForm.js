import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>title: <input className='newTitleInp' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
        <div>author: <input className='newAuthorInp' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
        <div>url: <input className='newUrlInp' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>
        <button className='subBtn' type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm