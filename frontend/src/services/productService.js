// productService.js
import axios from '../axios';

const handleGetAllProduct = () => {
  return axios.get('/api/get-all-product');
};

const handleGetProductById = (id) => {
  return axios.get(`/api/get-product-by-id/${id}`);
};

const handleCreateProduct = (name, category_id, detail, price, discount, image) => {
  return axios.post('/api/create-product', { name, category_id, detail, price, discount, image });
};

const handleUpdateProduct = (id, name, category_id, detail, price, discount, image) => {
  return axios.put(`/api/update-product/${id}`, { name, category_id, detail, price, discount, image });
};

const handleDeleteProduct = (id) => {
  return axios.delete(`/api/delete-product/${id}`);
};
const handleGetAllCategory = () => {
  return axios.get('/api/get-all-category');
};
const handleDeleteManyProduct = () => {
  return axios.post('/api/delete-many-product');
};


export {
  handleGetAllProduct,
  handleGetProductById,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetAllCategory,
  handleDeleteManyProduct,
};
