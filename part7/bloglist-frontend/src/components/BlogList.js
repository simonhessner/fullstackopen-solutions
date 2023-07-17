import { useEffect, useRef } from "react";
import Blog from ".//Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, deleteBlog, likeBlog, setBlogs } from "../reducers/blogSlice";
import { useNotification } from "../hooks/notification";

const useBlogs = () => {
  // This custom hook handles fetching and sorting all blogs

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs).toSorted(
    (a, b) => b.likes - a.likes,
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  return blogs;
};

const BlogList = () => {
  const notification = useNotification();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogs = useBlogs();

  const blogFormRef = useRef();

  const create = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const createdBlog = await blogService.create(newBlog);
      console.log(createdBlog);
      dispatch(addBlog(createdBlog));
      notificaton.info(`Created '${createdBlog.title}'`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Do you want to delete this blog post?")) {
      return;
    }
    try {
      await blogService.remove(id);
      dispatch(deleteBlog({ id }));
      notificaton.info("removed blog");
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  const like = async (blog) => {
    await blogService.like(blog);
    dispatch(likeBlog(blog));
  };

  if (!user) return null;

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm create={create} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          remove={() => remove(blog.id)}
          like={() => like(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
