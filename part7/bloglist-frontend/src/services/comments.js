import axios from "axios";
const baseUrl = "/api/blogs";

export const addComment = async (blogId, text) => {
  return axios
    .post(`${baseUrl}/${blogId}/comments`, { text })
    .then((res) => res.data);
};
