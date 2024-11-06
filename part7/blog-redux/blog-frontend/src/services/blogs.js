import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const newBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const likeBlog = async (blog) => {
  const likedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
  const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog);
  return response.data;
};

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blog.id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, getBlog, newBlog, likeBlog, setToken, deleteBlog };
