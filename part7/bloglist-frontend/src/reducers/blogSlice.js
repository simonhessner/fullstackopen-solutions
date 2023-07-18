import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog: (state, action) => state.concat(action.payload),
    setBlogs: (state, action) => action.payload,
    deleteBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload.id),
    likeBlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: blog.likes + 1 },
      );
    },
    commentBlog: (state, action) => {
      const data = action.payload;
      const blog = state.find((blog) => blog.id === data.blog.id);
      const newComments = blog.comments.concat({
        text: data.text,
        id: data.id,
      });
      const newBlog = { ...blog, comments: newComments };
      return state.map((blog) => (blog.id === data.blog.id ? newBlog : blog));
    },
  },
});

export const { addBlog, setBlogs, deleteBlog, likeBlog, commentBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
