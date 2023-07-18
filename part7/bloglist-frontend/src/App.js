import { Routes, Route, Link, useMatch } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogView from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import { useUser } from "./hooks/user";
import "./App.css";

const App = () => {
  const userService = useUser();
  const user = userService.user;
  const userMatch = useMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const blogMatch = useMatch("/blogs/:id");
  const blogId = blogMatch ? blogMatch.params.id : null;

  const linkPadding = { padding: "5px" };
  const menuStyle = {
    padding: "10px",
    backgroundColor: "#ccc",
    marginBottom: "10px",
  };

  return (
    <>
      <Notification />
      <div style={menuStyle}>
        <Link style={linkPadding} to="/">
          Blogs
        </Link>
        <Link style={linkPadding} to="/users">
          Users
        </Link>
        {user && (
          <span>
            Logged in: {user.username}{" "}
            <button onClick={userService.logout}>Logout</button>
          </span>
        )}
      </div>

      <LoginForm />

      <Routes>
        <Route path="/users/:id" element={<User id={userId} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogView id={blogId} />} />
        <Route path="/" element={<BlogList />} />
        <Route path="*" element="Not found" />
      </Routes>
    </>
  );
};

export default App;
