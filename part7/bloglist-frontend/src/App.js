import { Routes, Route, Link, useMatch } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogView from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import "./App.css";

const App = () => {
  const userMatch = useMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const blogMatch = useMatch("/blogs/:id");
  const blogId = blogMatch ? blogMatch.params.id : null;

  const style = { padding: "5px" };
  return (
    <>
      <Notification />
      <div>
        <Link style={style} to="/">
          Home
        </Link>
        <Link style={style} to="/users">
          Users
        </Link>
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
