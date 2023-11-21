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

export {handleLoginApi, handleRegisterApi, handleGetAllCategory}