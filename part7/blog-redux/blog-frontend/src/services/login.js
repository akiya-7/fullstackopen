import axios from "axios";
const baseUrl = "/api";

const login = async (loginDetails) => {
  try {
    const tokenRequest = await axios.post(`${baseUrl}/login`, loginDetails);
    return tokenRequest.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { login };
