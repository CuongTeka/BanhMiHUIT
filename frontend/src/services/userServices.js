// userService.js
import axios from "../axios";

const handleLoginApi = (email, pass) => {
    return axios.post('/api/signin', {email, pass})
}//login
  return axios.post("/api/signin", { email, pass });
};

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

// export const updateUser = async (id, data) => {
//     const res = axios.put(`api/user/update-user/${id}`, data)
//     return res.data
// }

// export const getDetailsUser = async (id, data) => {
//     const res = axios.get(`api/user/get-details/${id}`, data)
//     return res.data
// }

  return axios.post("/api/signup", { email, pass, name, mssv, phone });
};

const handleGetAllUser = () => {
  return axios.get("/api/get-all-user");
};

const handleGetUserById = (id) => {
  return axios.get(`/api/get-user-byid?id=${id}`);
};

const handleUpdateUser = (id, email, pass, name, mssv, phone, role) => {
  return axios.put(`/api/update-user?id=${id}`, {
    email,
    pass,
    name,
    mssv,
    phone,
    role,
  });
};
const getDetailsUser = async (id) => {
  const res = await axios.get(`/api/user/get-details/${id}`);
  return res.data;
};

const handleDeleteUser = (id) => {
  return axios.delete(`api/delete-user?id=${id}`);
};
const handleGetImage = (imageName) => {
  return axios.get(`/api/images?imageName=${encodeURIComponent(imageName)}`, {
    responseType: "arraybuffer",
  });
};
export const hanldedeleteManyUser = async (data) => {
  const res = await axios.post(`api/user/delete-many`, data);
}

export {
    handleLoginApi, handleRegisterApi, 
    handleGetAllUser, handleGetUserById,
    handleUpdateUser, handleDeleteUser,
    handleGetImage
}

export {
    handleLoginApi, handleRegisterApi, 
    handleGetAllUser, handleGetUserById,
    handleUpdateUser, handleDeleteUser,
    handleGetImage
}