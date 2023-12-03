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

const handleCreateProduct = (name, category_id, detail, price, discount, image) => {
  return axios.post('/api/create-product', {name, category_id, detail, price, discount, image})
}//truyền vào dữ liệu

const handleUpdateProduct = (id, name, category_id, detail, price, discount, image) => {
  return axios.put(`/api/update-product?id=${id}`, {name, category_id, detail, price, discount, image})
}//truyền vào id trước, sau đó là dữ liệu

const handleDeleteProduct = (id) => {
  return axios.delete(`/api/delete-product?id=${id}`)
}//truyền vào id

const handleUpdateUser = (id, email, pass, name, mssv, phone, role) => {
  return axios.put(`/api/update-user?id=${id}`, {email, pass, name, mssv, phone, role})
}//truyền vào id, sau đó là dữ liệu

const handleDeleteUser = (id) => {
  return axios.delete(`api/delete-user?id=${id}`)
}

export { 
  handleGetAllUser, handleGetUserById, handleGetAllProduct, handleGetProductById,
  handleCreateProduct, handleUpdateProduct, handleDeleteProduct, handleUpdateUser,
  handleDeleteUser,
};
