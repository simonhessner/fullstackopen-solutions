import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogSlice";

export const useBlogs = () => {
  // This custom hook handles fetching and sorting all blogs

  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs).toSorted(
    (a, b) => b.likes - a.likes,
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  return blogs;
};
