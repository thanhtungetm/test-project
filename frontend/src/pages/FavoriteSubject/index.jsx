function FavoriteSubject() {
    return (
        <div>
        <h2>Môn học yêu thích</h2>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên môn</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {histories.map((item, index) => (
                        <tr key={item}>
                            <th scope="row">{index+1}</th>
                            <td>{item.quizId.content}</td>
                            <td>{getAnswer(item.answer)}</td>
                            <td>{item.score}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default FavoriteSubject;