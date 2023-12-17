// productService.js
import axios from "../axios";

const handleGetAllProduct = () => {
  return axios.get("/api/get-all-product");
};

const handleGetProductById = (id) => {
  return axios.get(`/api/get-product-by-id/${id}`);
};

const handleCreateProduct = (data) => {
  const { name, category_id, detail, price, discount, image, is_active } = data;
  return axios.post("/api/create-product", {
    name,
    category_id,
    detail,
    price,
    discount,
    image,
    is_active,
  });
};

const handleUpdateProduct = (
  id,
  name,
  category_id,
  detail,
  price,
  discount,
  image
) => {
  return axios.put(`/api/update-product/${id}`, {
    name,
    category_id,
    detail,
    price,
    discount,
    image,
  });
};

const handleDeleteProduct = (id) => {
  return axios.delete(`/api/delete-product/${id}`);
};
const handleGetAllCategory = () => {
  return axios.get("/api/get-all-category");
};
const handleDeleteManyProduct = () => {
  return axios.post("/api/delete-many-product");
};

const handleUploadImage = (image) => {
  return axios.post("/api/upload", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const changeActive = (id, data) => {
  return axios.put(`/api/change-active/${id}`, data);
};

export {
  handleGetAllProduct,
  handleGetProductById,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetAllCategory,
  handleDeleteManyProduct,
  handleUploadImage,
  changeActive,
};
