import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BEURL || "https://banh-mi-huit-server.vercel.app/",
  withCredentials: true,
});

instance.interceptors.response.use((response) => {
  // const {data} = response;
  return response.data;
});

export default instance;
