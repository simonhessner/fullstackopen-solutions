import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import blogService from "../services/blogs";
import { addBlog } from "../reducers/blogSlice";
import { useNotification } from "../hooks/notification";
import { useBlogs } from "../hooks/blogs";

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
      notification.info(`Created '${createdBlog.title}'`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  if (!user) return null;

  const style = {
    border: "1px solid black",
    margin: "1px",
    padding: "1px",
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm create={create} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={style} className="blog-entry">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
