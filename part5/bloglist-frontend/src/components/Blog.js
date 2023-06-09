import { useState } from 'react'

const Blog = ({ blog, remove, like, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const visibleButtonText = visible ? 'hide' : 'show'

  const style = {
    border: '1px solid black',
    margin: '1px',
    padding: '1px'
  }

  const isCreator = currentUser.username === blog.user.username

  return <div style={ style } className='blog-entry'>
    <i>{blog.title}</i> by <i>{blog.author}</i>
    <button onClick={toggleVisibility}>{visibleButtonText}</button>
    { visible && <> <br />
      URL: {blog.url} <br />
      Likes: {blog.likes} <button onClick={like}>like</button> <br />
      User: {blog.user.username} <br />
      {isCreator && <button onClick={remove}>remove</button> }
    </>}
  </div>
}

export default Blog