import axios from '../axios'

const handleLoginApi = (email, pass) => {
    return axios.post('/api/signin', {email, pass})
}

const handleRegisterApi = (email, pass, name, mssv, phone) => {
    return axios.post('/api/signup', {email, pass, name, mssv, phone})
}

const handleGetAllCategory = () => {
    return axios.get('/api/get-all-category')
}
export const updateUser = async (id, data) => {
    const res = axios.put(`api/user/update-user/${id}`, data)
    return res.data
}

export const getDetailsUser = async (id, data) => {
    const res = axios.get(`api/user/get-details/${id}`, data)
    return res.data
}
const handleGetImage = (imageName) => {
    return axios.get(`/api/images?imageName=${encodeURIComponent(imageName)}`, {responseType: 'arraybuffer'})
}

export {handleLoginApi, handleRegisterApi, handleGetAllCategory,handleGetImage}