import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import { useDispatch } from "react-redux";
import { showNotification } from "./reducers/notificationSlice";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const notify = (type, message) => {
    dispatch(showNotification(type, message, 5000));
  };

  const info = (message) => notify("info", message);
  const error = (message) => notify("error", message);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const loginHandler = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      info(`${user.username} logged in`);
    } catch (exception) {
      console.log(exception);
      error(exception.response.data.error);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const create = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const createdBlog = await blogService.create(newBlog);
      console.log(createdBlog);
      setBlogs([...blogs, createdBlog]);
      info(`Created '${createdBlog.title}'`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      error(exception.response.data.error);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Do you want to delete this blog post?")) {
      return;
    }
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      info("removed blog");
    } catch (exception) {
      console.log(exception);
      error(exception.response.data.error);
    }
  };

  const like = async (blog) => {
    const response = await blogService.like(blog);
    setBlogs(
      blogs.map((b) => {
        if (b.id === blog.id) {
          return response.data;
        }
        return b;
      }),
    );
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />
      {!user && <LoginForm login={loginHandler} />}
      {user && (
        <div>
          Logged in: {user.username}{" "}
          <button onClick={logoutHandler}>Logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm create={create} />
          </Togglable>
          <h2>blogs</h2>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              remove={() => remove(blog.id)}
              like={() => like(blog)}
              currentUser={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
