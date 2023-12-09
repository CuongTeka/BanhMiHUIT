import axios from '../axios';

const handleGetAllCategory = () => {
    return axios.get('/api/get-all-category')
}

export { 
    handleGetAllCategory,
};