import { useEffect, useState } from 'react';
import './Quiz.css'
import QuizService from '../../services/quiz.service';
import YesNoQuiz from './YesNoQuiz';
import MultiQuiz from './MultiQuiz';
function Quiz({quiz, onAnswer,onStop}) {

    const [answer, setAnswer] = useState(null)

    return (
        <div className='container'>
            <div class="body-quiz">Câu hỏi</div>
            <div>
                {quiz&& (
                    quiz.type === 0 ? 
                    (<YesNoQuiz data={quiz} onAnswer={(a)=>setAnswer(a)}/>) 
                    :
                     (<MultiQuiz data={quiz} onAnswer={(a)=>setAnswer(a)}/>)
                )}
            </div>
            <button className='btn btn-primary mx-2'
            disabled={!answer}
                onClick={()=>onAnswer(answer)}
            >Nộp</button>
            <button className='btn btn-primary'
                onClick={onStop}
            >Dừng</button>
        </div>
    );
}

export default Quiz;