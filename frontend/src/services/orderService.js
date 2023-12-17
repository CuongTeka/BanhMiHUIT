import axios from "../axios";

const handleGetAllOrder = () => {
  return axios.get("/api/get-all-order");
};

const handleGetOrderById = (id) => {
  return axios.get(`/api/get-order-by-id/${id}`);
}; // truyền id vào

const handleCreateOrder = (
  customer,
  item,
  total,
  payment,
  status,
  shipping,
  note
) => {
  return axios.post("/api/signup", {
    customer,
    item,
    total,
    payment,
    status,
    shipping,
    note,
  });
}; //truyền dữ liệu vào

const handleUpdateOrder = (
  id,
  customer,
  item,
  total,
  payment,
  status,
  shipping,
  note
) => {
  return axios.put(`/api/update-order/${id}`, {
    customer,
    item,
    total,
    payment,
    status,
    shipping,
    note,
  });
}; //truyền vào dữ liệu

const handleUpdateStatus = (id, data) => {
  const { is_paid, status } = data;
  return axios.put(`/api/update-status/${id}`, { is_paid, status });
};

export {
  handleGetAllOrder,
  handleGetOrderById,
  handleCreateOrder,
  handleUpdateOrder,
  handleUpdateStatus,
};
