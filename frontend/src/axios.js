import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.BEURL || 'http://localhost:8080/',
    withCredentials:true,
})

instance.interceptors.response.use(
    (response) => {
        const {} = response;
        return response.data
    }
)

export default instance