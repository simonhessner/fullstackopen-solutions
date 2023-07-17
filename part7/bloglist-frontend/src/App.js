import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import "./App.css";
import BlogList from "./components/BlogList";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const style = { padding: "5px" };
  return (
    <Router>
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
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </Router>
  );
};

export default App;
