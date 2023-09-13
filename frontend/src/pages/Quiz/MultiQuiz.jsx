function MultiQuiz({data, onAnswer}) {

    const answer = (asw)=>{
        onAnswer(asw)
    }

    return (<div>
        <h3>{data.content}</h3>
        <div>
            {data.options.map((item)=>(
                <div key={item.body} class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                    onClick={()=>answer(item.body)}
                />
                    <label class="form-check-label" for="flexRadioDefault1">
                        {item.body}
                    </label>
            </div>
            ))}
        </div>
    </div>);
}

export default MultiQuiz;