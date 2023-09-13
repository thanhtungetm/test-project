const { QuizType } = require("../constant/index.constant")
const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/promise")
const db = require("../models")
const Test = db.Test
const Quiz = db.Quiz


exports.createTest = async(req, res, next)=>{

    if(!req.body.quizes || req.body.quizes.length ===0){
        return next(new BadRequestError(400, "No quizes at all!"));
    }

    const test = new Test({
        name: req.body.name,
        score: req.body.score,
        quizes: req.body.quizes
    });

    const [error] = await handle(test.save());

    if (error) {
        return next(new BadRequestError(400, "Error!"));
    }

    res.send({ message: "Create a quiz successfully!" });
}

//Find all Quiz
exports.findAll = async(req, res, next) => {
    const [error, documents] = await handle(
        Test.find().populate('quizes')
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all Test"
            )
        );
    }

    return res.send(documents);
};


//Random a Quiz
exports.randomQuizesInTest = async(req, res, next) => {
    const {number} = req.body;
    const count = await Quiz.count().exec()

    console.log("Number", number);
    if(Number(number) > count){
        return next(new BadRequestError(
            400,
            "The number is out of the quizes!"
        ))
    }

    Quiz.aggregate().sample(Number(number)).then((a,b)=>console.log(a,b))
    const [error,quizes] = await handle(Quiz.aggregate().sample(number))
    
    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all Quizs"
            )
        );
    }
    return res.send(quizes)
};
