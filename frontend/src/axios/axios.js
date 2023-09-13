import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:6868/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
function getToken(){
    const user = JSON.parse(localStorage.getItem('user-info'))
    if(user){
        return user.accessToken
    }
    return ""
}
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${getToken()}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosClient;