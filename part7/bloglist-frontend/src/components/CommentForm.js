import { useState } from "react";
import { addComment } from "../services/comments";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogSlice";
import { useNotification } from "../hooks/notification";

import { TextField, Button, Grid } from "@mui/material";

const CommentForm = ({ blogId }) => {
  const notification = useNotification();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const submit = (event) => {
    event.preventDefault();
    addComment(blogId, text).then((comment) => {
      dispatch(commentBlog(comment));
      notification.info("comment added");
    });
    setText("");
  };

  return (
    <form onSubmit={submit}>
      <Grid container spacing={2} width={"100%"} columns={20}>
        <Grid item xs={19}>
          <TextField
            variant="standard"
            label="Comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" type="submit">
            add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
