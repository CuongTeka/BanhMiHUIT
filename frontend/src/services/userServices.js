// userService.js
import axios from "../axios";

const handleLoginApi = (email, pass) => {
    return axios.post('/api/signin', {email, pass})
}//login

const handleRegisterApi = (email, pass, name, mssv, phone) => {
    return axios.post('/api/signup', {email, pass, name, mssv, phone})
}//signin

const handleGetAllUser = () => {
    return axios.get('/api/get-all-user');
};
  
const handleGetUserById = (id) => {
    return axios.get(`/api/get-user-byid?id=${id}`);
};// truyền id vào
  
const handleUpdateUser = (id, email, pass, name, mssv, phone, role) => {
    return axios.put(`/api/update-user?id=${id}`, {email, pass, name, mssv, phone, role})
}//truyền vào dữ liệu và id
  
const handleDeleteUser = (id) => {
    return axios.delete(`api/delete-user?id=${id}`)
}//truyền id vào

const handlegetDetailsUser = async (id) => {
  const res = await axios.get(`/api/user/get-details/${id}`);
  return res.data;
};

const handleGetImage = (imageName) => {
  return axios.get(`/api/images?imageName=${encodeURIComponent(imageName)}`, {
    responseType: "arraybuffer",
  });
};

// export const hanldedeleteManyUser = async () => {
//   const res = await axios.post(`api/user/delete-many`);
// }

export {
    handleLoginApi, handleRegisterApi, 
    handleGetAllUser, handleGetUserById,
    handleUpdateUser, handleDeleteUser,
    handleGetImage, handlegetDetailsUser
}