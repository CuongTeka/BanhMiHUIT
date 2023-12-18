import axios from "../axios";

const handleGetAllOrder = () => {
  return axios.get("/api/get-all-order");
};

const handleGetOrderById = (id) => {
  return axios.get(`/api/get-order-by-id/${id}`);
}; // truyền id vào

const handleGetOrderByCustomerId = (id) => {
  return axios.get(`/api/get-order-by-customer-id/${id}`);
}; // truyền id vào

const handleGetOrderByCustomerName = (name) => {
  return axios.get(`/api/get-order-by-customer-name/${name}`);
}; // truyền id vào

const handleCreateOrder = (data) => {
  const { customer, item, note, payment, shipping, total } = data;
  return axios.post("/api/create-order", {
    customer,
    item,
    total,
    payment,
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

const handleUpdateRequest = (id, checkpaid) => {
  return axios.put(`/api/update-request/${id}`, { checkpaid });
};

export {
  handleGetAllOrder,
  handleGetOrderById,
  handleCreateOrder,
  handleUpdateOrder,
  handleUpdateStatus,
  handleGetOrderByCustomerId,
  handleGetOrderByCustomerName,
  handleUpdateRequest,
};
