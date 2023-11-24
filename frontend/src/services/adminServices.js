import axios from '../axios';

const handleGetAllUser = () => {
  return axios.get('/api/get-all-user');
};

const handleGetUserById = (id) => {
  return axios.get(`/api/get-user-byid?id=${id}`);
};

const handleGetAllProduct = () => {
  return axios.get('/api/get-all-product');
};

const handleGetProductById = (id) => {
  return axios.get(`/api/get-product-byid?id=${id}`);
};

export { handleGetAllUser, handleGetUserById, handleGetAllProduct, handleGetProductById };
