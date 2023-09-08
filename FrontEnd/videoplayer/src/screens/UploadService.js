import http from './../services/apiService';

export default {
    upload: (data) => http.post(`https://localhost:5001/api/Player/Upload`, data)
};