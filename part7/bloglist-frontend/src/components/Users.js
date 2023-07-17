import { useEffect, useState } from "react";
import userService from "../services/user";

const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);
  if (!users) return null;

  console.log(users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
