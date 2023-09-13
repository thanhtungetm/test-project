import axiosClient from '../axios/axios'
class QuizService{
    static getAll = () => axiosClient.get('quizes');
    static getRandom = () => axiosClient.get('quizes/random');
}
export default QuizService