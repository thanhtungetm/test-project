import { useEffect, useState } from "react";
import QuizService from "../../services/quiz.service";
import Quiz from "../Quiz";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

function RandomQuiz() {

    const navigate = useNavigate()

    const [isStart, setIsStart] = useState(false)
    const [err, setErr] = useState(false)

    function start() {
        setIsStart(true)
        getRandom()
    }

    const [quiz, setQuiz] = useState(null);
    const [finalAnswer, setFinalAnswer] = useState(null);

    async function getRandom() {
        try {
            const res = await QuizService.getRandom()
            setQuiz(res);
            console.log(res);
        } catch (error) {
            setErr(true)
        }

    }

    async function sendAnswer() {
        const res = await QuizService.sendAnswer()
    }

    async function answer(asw) {
        try {
            const data = { quizId: quiz.id, answer: asw }
            const res = await UserService.sendAnswer(data)
            getRandom()
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // getRandom()
    }, [])

    return (<div>
        <h2>Random Quiz</h2>
        {!isStart && <button className="btn btn-primary"
            onClick={start}
        >Bắt đầu</button>}

        {!err && quiz && <div>
            <Quiz quiz={quiz} onAnswer={answer} onStop={() => navigate('/history')}></Quiz>
        </div>}
        {err && (<div className="alert alert-danger"> Đã hết câu hỏi!</div>)}

    </div>);
}

export default RandomQuiz;