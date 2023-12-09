import axios from '../axios';

const handleGetAllProduct = () => {
    return axios.get('/api/get-all-product');
  };
  
const handleGetProductById = (id) => {
    return axios.get(`/api/get-product-byid?id=${id}`);
};//truyền id vào
  
const handleCreateProduct = (name, category_id, detail, price, discount, image) => {
    return axios.post('/api/create-product', {name, category_id, detail, price, discount, image}, {
      headers: {
      'Content-Type': 'multipart/form-data', 
    },
  })
}//truyền vào dữ liệu
  
const handleUpdateProduct = (id, name, category_id, detail, price, discount, image) => {
    return axios.put(`/api/update-product?id=${id}`, {name, category_id, detail, price, discount, image})
}//truyền dữ liệu và id
  
const handleDeleteProduct = (id) => {
    return axios.delete(`/api/delete-product?id=${id}`)
}//truyền vào id

export { 
    handleGetAllProduct, handleGetProductById,
    handleCreateProduct, handleUpdateProduct, handleDeleteProduct, 

};