const Blog = ({blog, remove}) => (
  <div>
    {blog.title} {blog.author} <button onClick={remove}>remove</button>
  </div>  
)

export default Blog