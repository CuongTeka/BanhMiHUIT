import axios from '../axios'

const handleLoginApi = (email, pass) => {
    return axios.post('/api/signin', {email, pass})
}

const handleRegisterApi = (email, pass, name, mssv, phone) => {
    return axios.post('/api/signup', {email, pass, name, mssv, phone})
}

export {handleLoginApi, handleRegisterApi}