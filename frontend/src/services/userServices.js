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

const handleGetImage = (imageName) => {
    // return axios.get(`/api/images?imageName=${imageName}`, {responseType: 'arraybuffer'})
    return axios.get(`/api/images?imageName=${encodeURIComponent(imageName)}`, {responseType: 'arraybuffer'})
}

export {handleLoginApi, handleRegisterApi, handleGetAllCategory,handleGetImage}