// CreateUserApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ensure this is your backend server URL

const getRoles = async () => {
  const response = await axios.get(`${API_URL}/organizations/roles`, { withCredentials: true });
  return response;
};

const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/user/create`, userData, { withCredentials: true });
  return response;
};

export default {
  getRoles,
  createUser,
};
