import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginService from "../services/login";
import { setUser, resetUser } from "../reducers/userSlice";
import { useNotification } from "../hooks/notification";

const useUser = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, []);

  const login = async (credentials) => {
    const user = await loginService.login(credentials);
    dispatch(setUser(user));
    window.localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    dispatch(resetUser());
  };

  return {
    user,
    login,
    logout,
  };
};

const LoginForm = () => {
  const notification = useNotification();
  const userService = useUser();
  const user = userService.user;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (credentials) => {
    try {
      const user = await userService.login(credentials);
      notification.info(`${user.username} logged in`);
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername("");
    setPassword("");
  };

  if (user) {
    return (
      <div>
        Logged in: {user.username}{" "}
        <button onClick={userService.logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={submit}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <button type="submit" id="login-button">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
