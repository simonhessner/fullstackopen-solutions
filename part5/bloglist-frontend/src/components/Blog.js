import { useState } from "react"

const Blog = ({blog, remove}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const visibleButtonText = visible ? 'hide' : 'show'

  const style = {
    border: '1px solid black',
    margin: '1px',
    padding: '1px'
  }

  return <div style={ style }>
    <i>{blog.title}</i> by <i>{blog.author}</i>
    <button onClick={remove}>remove</button>
    <button onClick={toggleVisibility}>{visibleButtonText}</button>
    { visible && <> <br />
      URL: {blog.url} <br />
      Likes: {blog.likes} <br />
      User: {blog.user.username}
    </>}
  </div>  
}

export default Blog