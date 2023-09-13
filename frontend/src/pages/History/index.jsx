import { useEffect, useState } from "react";
import UserService from "../../services/user.service";

function History() {

    const [histories, setHistories] = useState([])

    async function getHistories() {
        try {
            const res = await UserService.getHistories()
        setHistories(res);
        console.log(res);
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        getHistories()
    }, [])

    function getAnswer(answer){
        if(answer === 'false'){
            return 'No'
        }
        if(answer === 'true'){
            return 'Yes'
        }
        return answer
    }

    return (
        <div>
            <h2>Lịch sử điểm</h2>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nội dung câu hỏi?</th>
                            <th scope="col">Trả lời</th>
                            <th scope="col">Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {histories.map((item, index) => (
                            <tr key={item}>
                                <th scope="row">{index+1}</th>
                                <td>{item.quizId.content}</td>
                                <td>{getAnswer(item.answer)}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default History;