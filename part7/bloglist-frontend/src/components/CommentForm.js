import { useState } from "react";
import { addComment } from "../services/comments";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogSlice";
import { useNotification } from "../hooks/notification";

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
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default CommentForm;
