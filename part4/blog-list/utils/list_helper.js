const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const reducer = (sum, item) => sum + item

  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const maxLikes = Math.max(...blogs.map(b => b.likes))

  const favBlog = blogs.filter(b => b.likes === maxLikes)[0]
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, b => b.author)
  const authorsBlogs = lodash.mapValues(groupedAuthors, v => v.length)
  const maxBlogs = Math.max(...lodash.values(authorsBlogs))
  const author = lodash.findKey(authorsBlogs, a => a === maxBlogs)
  return {
    author: author,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, b => b.author)
  const authorsLikes = lodash.mapValues(groupedAuthors, a => a.map(b => b.likes).reduce((s,i) => s+i, 0))
  const maxLikes = Math.max(...lodash.values(authorsLikes))
  const author = lodash.findKey(authorsLikes, a => a === maxLikes)
  return {
    author: author,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}