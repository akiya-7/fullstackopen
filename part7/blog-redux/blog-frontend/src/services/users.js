import axios from "axios";

const baseURL = "/api/users";

const getUsers = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data;
};

export default { getUsers, getUser };
