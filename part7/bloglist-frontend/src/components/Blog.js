import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { useNotification } from "../hooks/notification";
import { deleteBlog, likeBlog } from "../reducers/blogSlice";
import { useBlogs } from "../hooks/blogs";
import { Link, useNavigate } from "react-router-dom";

const Blog = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notification = useNotification();

  const currentUser = useSelector((state) => state.user);

  const blogs = useBlogs();
  const blog = blogs.find((blog) => blog.id === id);
  if (blogs.length > 0 && !blog) return "not found";
  if (blogs.length === 0) return null;

  const isCreator = currentUser && currentUser.username === blog.user.username;

  const remove = async () => {
    if (!window.confirm("Do you want to delete this blog post?")) {
      return;
    }
    try {
      await blogService.remove(id);
      dispatch(deleteBlog({ id }));
      notification.info("removed blog");
      navigate("/");
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  const like = async () => {
    await blogService.like(blog);
    dispatch(likeBlog(blog));
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes <button onClick={like}>like</button>
      </p>
      <p>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </p>
      {isCreator && <button onClick={remove}>remove</button>}

      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
