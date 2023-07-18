import { Routes, Route, Link, useMatch } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogView from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import { useUser } from "./hooks/user";
import "./App.css";
import { Container, Grid } from "@mui/material";

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
    <Container>
      <Grid
        container
        spacing={2}
        width={"100%"}
        columns={20}
        backgroundColor="#ccc"
        padding="5px"
      >
        <Grid item xs={2}>
          <Link style={linkPadding} to="/">
            Blogs
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link style={linkPadding} to="/users">
            Users
          </Link>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={4} alignContent={"revert"}>
          {user && (
            <span>
              Logged in: {user.username}{" "}
              <button onClick={userService.logout}>Logout</button>
            </span>
          )}
        </Grid>
      </Grid>

      <Notification />

      <LoginForm />

      <Routes>
        <Route path="/users/:id" element={<User id={userId} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogView id={blogId} />} />
        <Route path="/" element={<BlogList />} />
        <Route path="*" element="Not found" />
      </Routes>
    </Container>
  );
};

export default App;
