const dummy = (blogs) => {
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

module.exports = { dummy, totalLikes, favoriteBlog }