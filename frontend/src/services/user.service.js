import axiosClient from '../axios/axios'
class UserService{
    // static login = (data) => axiosClient.post('login',data);
    // static signup = (data) => axiosClient.post('signup',data);
    static sendAnswer = (data) => axiosClient.post('user/answer',data);
    static getHistories = () => axiosClient.get('user/histories');
    
}
export default UserService