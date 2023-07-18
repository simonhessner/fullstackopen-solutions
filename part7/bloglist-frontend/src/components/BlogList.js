import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "@emotion/styled";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Accordion,
} from "@mui/material";

import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import { useBlogs } from "../hooks/blogs";

const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #fff;
  }
  &:nth-of-type(even) {
    background-color: #ccc;
  }lor: white;
  }
`;

const BlogList = () => {
  const user = useSelector((state) => state.user);
  const blogs = useBlogs();
  const blogFormRef = useRef();

  if (!user) return null;

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreated={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      <h2>blogs</h2>
      <TableContainer>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRowStyled key={blog.id} className="blog-entry">
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.user.username}</TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
