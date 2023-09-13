import axiosClient from '../axios/axios'
class TestService{
    static login = (data) => axiosClient.post('login',data);
    static signup = (data) => axiosClient.post('signup',data);
}
export default TestService