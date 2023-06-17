import { useState } from "react"

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submit = event => {
    event.preventDefault()
    create({ title, author, url })
  }

  return <div>
    <h2>Create new blog</h2>
    <form onSubmit={submit}>
      <p>
        <label htmlFor='title'>title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor='author'>author</label>
        <input
          type='text'
          id='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor='url'>url</label>
        <input
          type='text'
          id='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </p>
      <button type='submit'>create</button>
    </form>
  </div>
}

export default BlogForm