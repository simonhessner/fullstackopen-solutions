import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const LoginForm = ({ username, password, setUsername, setPassword, login}) => {
  const submit = (event) => {
    event.preventDefault()
    login()
  }
  return <div>
    <h2>Login to application</h2>
    <form onSubmit={submit}>
      <p>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </p>
      <p>
        <button type='submit'>Login</button>
      </p>
    </form>
  </div>
}

const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, create}) => {
  const submit = event => {
    event.preventDefault()
    create()
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showError = message => {
    setNotification({
      type: 'error',
      message
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const showInfo = message => {
    setNotification({
      type: 'info',
      message
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const loginHandler = async () => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      showInfo(`${user.username} logged in`)
    } catch(exception) {
      console.log(exception)
      showError(exception.response.data.error)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }
  
  const create = async () => {
    try {
      const newBlog = {
        title,
        author,
        url
      }
      const createdBlog = await blogService.create(newBlog)
      console.log(createdBlog)
      setBlogs([...blogs, createdBlog])
      showInfo(`Created '${createdBlog.title}'`)
    } catch(exception) {
      console.log(exception)
      showError(exception.response.data.error)
    }
  }

  const remove = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      showInfo('removed blog')
    } catch(exception) {
      console.log(exception)
      showError(exception.response.data.error)
    }
  }

  return (
    <div>
      {notification && <Notification type={notification.type} message={notification.message} /> }
      {!user && <LoginForm
        username={username}
        password={password} 
        setUsername={setUsername}
        setPassword={setPassword}
        login={loginHandler}
      />}
      {user && <div>
        Logged in: {user.username} <button onClick={logoutHandler}>Logout</button>

        <BlogForm
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          create={create}
        />

        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} remove={() => remove(blog.id)} />
        )}
      </div>}      
    </div>
  )
}

export default App