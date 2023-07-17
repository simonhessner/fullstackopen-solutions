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
  },
});

export const { addBlog, setBlogs, deleteBlog, likeBlog } = blogSlice.actions;

export default blogSlice.reducer;
