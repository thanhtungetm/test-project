function YesNoQuiz({data, onAnswer}) {

    const answer = (asw)=>{
        onAnswer(asw)
    }

    return (<div>
        <h3>{data.content}</h3>
        <div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                    onClick={()=>answer(true)}
                />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Yes
                    </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                 onClick={()=>answer(false)}
                />
                    <label class="form-check-label" for="flexRadioDefault1">
                    No
                    </label>
            </div>
        </div>
    </div>);
}

export default YesNoQuiz;