import axiosClient from '../axios/axios'
class SubjectService{
    static login = (data) => axiosClient.post('login',data);
    static signup = (data) => axiosClient.post('signup',data);
}
export default SubjectService