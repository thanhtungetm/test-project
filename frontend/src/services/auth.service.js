import axiosClient from '../axios/axios'
class AuthService{
    static login = (data) => axiosClient.post('signin',data);
    static signup = (data) => axiosClient.post('signup',data);
}

export default AuthService