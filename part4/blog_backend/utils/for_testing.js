const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const n = array.length
  if (n === 0) return 0

  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / n
}

module.exports = {
  reverse,
  average,
}