import { Link } from "react-router-dom";
import { getOne } from "../services/user";
import { useEffect, useState } from "react";

const useUser = (id) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getOne(id).then((user) => setUser(user));
  }, [id]);
  return user;
};

const User = ({ id }) => {
  const user = useUser(id);
  if (!user) return "Loading...";

  return (
    <div>
      <h1>{user.username}'s blogs</h1>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
