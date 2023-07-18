import { useEffect, useState } from "react";
import { getAll } from "../services/user";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    getAll().then((users) => setUsers(users));
  }, []);
  if (!users) return null;

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
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
