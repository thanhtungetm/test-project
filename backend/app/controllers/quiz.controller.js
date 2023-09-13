const { QuizType } = require("../constant/index.constant")
const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/promise")
const db = require("../models")
const Quiz = db.Quiz


exports.createQuiz = async(req, res, next)=>{
    
    if(req.body.type === QuizType.MULTI_CHOICE && !req.body.options){
        return next(new BadRequestError(400, "Miss otions for quiz!"));
    }

    const quiz = new Quiz({
        content: req.body.content,
        type: req.body.type,
        options: req.body.options,
        yesNoAnswer: req.body.yesNoAnswer,
        subjectId: req.body.subjectId
    });

    const [error] = await handle(quiz.save());

    if (error) {
        return next(new BadRequestError(400, "Error!"));
    }

    res.send({ message: "Create a quiz successfully!" });
}

//Find all Quiz
exports.findAll = async(req, res, next) => {
    const [error, documents] = await handle(
        Quiz.find()
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all Quizs"
            )
        );
    }

    return res.send(documents);
};


//Random a Quiz in a Test
exports.randomAQuizInATest = async(req, res, next) => {
    const userId = req.userId
    const count = await Quiz.count().exec()
    console.log(count);
    let randomQuiz
    try {
        do{
            const random = Math.floor(Math.random() * count)
            console.log(random)
            let [error,quiz] = await handle(Quiz.findOne().skip(random).exec())
            if (error) {
                return next(
                    new BadRequestError(
                        500,
                        "Error find random Quizes"
                    )
                );
            }
            randomQuiz = quiz
        }while(await isInHistory(randomQuiz,userId))
    } catch (error) {
        return next(
            new BadRequestError(
                500,
                "Out of quizes!"
            )
        );
    }
    
    return res.send(randomQuiz)
};
exports.randomAQuiz = async(req, res, next) => {
    const userId = req.userId
    const count = await Quiz.count().exec()
    console.log(count);
    let randomQuiz
    try {
        do{
            const random = Math.floor(Math.random() * count)
            console.log(random)
            let [error,quiz] = await handle(Quiz.findOne().skip(random).exec())
            if (error) {
                return next(
                    new BadRequestError(
                        500,
                        "Error find random Quizes"
                    )
                );
            }
            randomQuiz = quiz
        }while(await isInHistory(randomQuiz,userId))
    } catch (error) {
        return next(
            new BadRequestError(
                500,
                "Out of quizes!"
            )
        );
    }
    
    return res.send(randomQuiz)
};

async function isInHistory(quiz,userId){
    const user = await db.User.findById(userId);
    const count = await Quiz.count().exec()
    if(user.histories.length === count){
        throw Error("Out of quizes!")
    }
    for(let history of user.histories){
        // console.log("His", history.quizId.equals(quiz.id), quiz.id);
        if(history.quizId.equals(quiz.id)){
            return true
        }
    }
    return false
}
