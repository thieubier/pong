import axios from 'axios';

// Set up axios instance with authorization header
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export default api;
