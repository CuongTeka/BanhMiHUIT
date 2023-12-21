import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BEURL || "http://localhost:8080/",
  withCredentials: true,
});

instance.interceptors.response.use((response) => {
  // const {data} = response;
  return response.data;
});

export default instance;
