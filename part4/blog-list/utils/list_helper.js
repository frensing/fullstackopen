const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const reducer = (sum, item) => sum + item

  return likes.reduce(reducer, 0)
}

module.exports = { dummy, totalLikes }