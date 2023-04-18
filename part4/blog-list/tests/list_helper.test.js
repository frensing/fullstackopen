const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    ...listWithOneBlog,
    {
      _id: '643e3dbaa585a48c7753f257',
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.test.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '643e3dbaa585a48c7753f258',
      title: 'Test Blog2',
      author: 'Test Author2',
      url: 'http://www.test2.com',
      likes: 1,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has no blogs, likes is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('list with 3 blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(9)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    ...listWithOneBlog,
    {
      _id: '643e3dbaa585a48c7753f257',
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.test.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '643e3dbaa585a48c7753f258',
      title: 'Test Blog2',
      author: 'Test Author2',
      url: 'http://www.test2.com',
      likes: 1,
      __v: 0
    }
  ]

  test('when list has only one blog, this is favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has no blogs, returns empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('list with 3 blogs, finds favorite', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
})


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})