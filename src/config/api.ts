import axios from 'axios';
import router from '@/router';
import LocalStorageUtils from '@/utils/LocalStorageUtils';

const api = axios.create({
    baseURL: 'http://localhost:8081',
});

api.interceptors.request.use(config => {
    const token = LocalStorageUtils.getToken();
    config.headers = {
        Authorization: token ? `Bearer ${token}` : '',
    };
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if (error.response) {
        if (401 === error.response.status || 403 === error.response.status) {
            await router.push('/');
        } else {
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default api;