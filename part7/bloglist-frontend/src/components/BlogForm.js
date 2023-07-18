import { useState } from "react";
import { useDispatch } from "react-redux";

import { TextField, Box, Button } from "@mui/material";

import blogService from "../services/blogs";
import { addBlog } from "../reducers/blogSlice";
import { useNotification } from "../hooks/notification";

const BlogForm = () => {
  const notification = useNotification();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const create = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const createdBlog = await blogService.create(newBlog);
      dispatch(addBlog(createdBlog));
      notification.info(`Created '${createdBlog.title}'`);
    } catch (exception) {
      console.log(exception);
      notification.error(exception.response.data.error);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    create({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50%", display: "block" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <TextField
          variant="standard"
          label="Title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          variant="standard"
          label="URL"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          create
        </Button>
      </Box>
    </div>
  );
};

export default BlogForm;
