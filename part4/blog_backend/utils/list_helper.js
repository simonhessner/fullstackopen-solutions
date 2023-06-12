const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((a,b) => a+b, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }

  return blogs.reduce((a,b) => (a.likes > b.likes) ? a : b)
}

const getCountReducer = incr => (stats, blog) => {
  const author = blog.author
  if(stats[author] === undefined) {
    stats[author] = 0
  }
  stats[author] += incr(blog)
  return stats
}

const getMaxFindReducer = attr => (result, [author, count]) => {
  if (result === null || result[attr] < count) {
    return {
      author,
      [attr]: count
    }
  } else {
    return result
  }
}

const getCounter = (countReducer, attribute) => (blogs) => {
  const counter = blogs.reduce(countReducer, {})
  return Object.entries(counter).reduce(getMaxFindReducer(attribute), null)
}

const mostBlogs = getCounter(getCountReducer(() => 1), 'blogs')
const mostLikes = getCounter(getCountReducer(blog => blog.likes), 'likes')

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}