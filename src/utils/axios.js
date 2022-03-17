import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_REST_API_URL}/api/v1`,
  withCredentials: true, // allow REST API to set HTTP Cookies
});

export default axiosInstance;
