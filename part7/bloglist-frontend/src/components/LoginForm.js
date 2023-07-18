import { useState } from "react";
import { useNotification } from "../hooks/notification";
import { useUser } from "../hooks/user";

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

  if (user) return null;

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
