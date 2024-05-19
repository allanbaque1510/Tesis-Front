import axios from "./axios";

const registerRequest = (user) => axios.post(`/register`, user);
const loginRequest = (user) => {
  return axios.post(`/login`, user);
};
const verifyToken = (user) => {
  return axios.get(`/verifyToken`, user);
};

const Axios = {
  loginRequest,
  registerRequest,
  verifyToken,
};

export default Axios;
