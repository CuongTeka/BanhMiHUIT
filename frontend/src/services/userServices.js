import axios from '../axios'

const handleLoginApi = (email, pass) => {
    return axios.post('/api/signin', {email, pass})
}

export {handleLoginApi}