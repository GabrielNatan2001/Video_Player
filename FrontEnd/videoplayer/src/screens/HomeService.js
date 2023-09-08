import http from './../services/apiService';

export default {
    getVideo: (id) => http.get(`https://localhost:5001/api/Player/GetAll`)
};