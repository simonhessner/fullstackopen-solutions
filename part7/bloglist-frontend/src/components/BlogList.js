import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import { useBlogs } from "../hooks/blogs";

const BlogList = () => {
  const user = useSelector((state) => state.user);
  const blogs = useBlogs();
  const blogFormRef = useRef();

  if (!user) return null;

  const style = {
    border: "1px solid black",
    margin: "1px",
    padding: "1px",
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreated={() => blogFormRef.current.toggleVisibility()} />
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
