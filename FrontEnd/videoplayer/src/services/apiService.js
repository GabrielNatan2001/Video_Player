import axios from 'axios';

const http = axios.create({
    baseURL: "https://localhost:5001/api"
})

export default http;