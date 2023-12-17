// userService.js
import axios from "../axios";

const handleLoginApi = (email, pass) => {
  return axios.post("/api/signin", { email, pass });
}; //login

const handleRegisterApi = (email, pass, name, mssv, phone) => {
  return axios.post("/api/signup", { email, pass, name, mssv, phone });
}; //signup

const handleRegister = (data) => {
  const { email, pass, name, mssv, phone } = data;
  return axios.post("/api/signup", { email, pass, name, mssv, phone });
}; //signup

const handleGetAllUser = () => {
  return axios.get("/api/get-all-user");
};

const handleGetUserById = (id) => {
  if (id) {
    return axios.get(`/api/get-user-by-id/${id}`);
  }
}; // truyền id vào

const handleUpdateUser = (data) => {
  const { id, email, pass, name, mssv, phone, role } = data;
  return axios.put(`/api/update-user/${id}`, {
    email,
    pass,
    name,
    mssv,
    phone,
    role,
  });
}; //truyền vào dữ liệu và id

const handleChangeUserPass = (data) => {
  const { id, oldpass, newpass } = data;
  return axios.put(`/api/change-user-password/${id}`, { oldpass, newpass });
}; //truyền vào id, mk cũ và mk mới

const handleChangeUserInfo = (userData) => {
  const { id, email, name, mssv, phone, pass } = userData;
  return axios.put(`/api/change-user-info/${id}`, {
    email,
    name,
    mssv,
    phone,
    pass,
  });
};

const handleDeleteUser = (id) => {
  return axios.delete(`api/delete-user/${id}`);
}; //truyền id vào

const handleDeleteManyUser = (ids) => {
  return axios.post("api/delete-many-user", ids);
};

// const handlegetDetailsUser = async (id) => {
//   const res = await axios.get(`/api/user/get-details/${id}`);
//   return res.data;
// };

const handleGetImage = (imageName) => {
  return axios.get(`/api/images?imageName=${encodeURIComponent(imageName)}`, {
    responseType: "arraybuffer",
  });
};

// export const hanldedeleteManyUser = async () => {
//   const res = await axios.post(`api/user/delete-many`);
// }

export {
  handleLoginApi,
  handleRegisterApi,
  handleRegister,
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleDeleteManyUser,
  handleChangeUserPass,
  handleChangeUserInfo,
  handleGetImage,
};
