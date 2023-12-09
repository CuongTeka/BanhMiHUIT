import axios from '../axios';

const handleGetAllOrder = () => {
    return axios.get('/api/get-all-order');
};

const handleGetOrderById = (id) => {
  return axios.get(`/api/get-order-byid?id=${id}`);
};// truyền id vào

const handleCreateOrder = (customer, item, total, payment, status, shipping, note) => {
    return axios.post('/api/signup', {customer, item, total, payment, status, shipping, note})
}//truyền dữ liệu vào

const handleUpdateOrder = (customer, item, total, payment, status, shipping, note) => {
    return axios.put(`/api/update-order?id=${id}`, {customer, item, total, payment, status, shipping, note})
}//truyền vào dữ liệu

  
export { 
    handleGetAllOrder, handleGetOrderById,
    handleCreateOrder, handleUpdateOrder,
};  