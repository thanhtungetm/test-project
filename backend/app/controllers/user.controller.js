const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const { QuizType, ModeTest } = require("../constant/index.constant");
const User = db.User;
const Quiz = db.Quiz;
const Test = db.Test;

exports.getInfo = async (req, res, next) => {
    const userId = req.userId
    console.log(userId);
    const [error, documents] = await handle(
        User.findById(userId, "-password")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error get info user"
            )
        );
    }

    return res.send(documents);
};

exports.getAllUsers = async (req, res, next) => {

    const [error, documents] = await handle(
        User.find({ username: { $ne: 'admin' } }, "-password")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error get info user"
            )
        );
    }

    return res.send(documents);
};


exports.addFavorite = async (req, res, next) => {

    const [error, document] = await handle(
        User.findOneAndUpdate({
            id: req.userId
        }, {
            $addToSet: {
                favorites: req.body.subjectId
            }
        }, { new: false }).populate('favorites')
    )


    if (error) {
        return next(new BadRequestError(400, "Error!"));
    }

    res.send({ message: document });
}

exports.answer = async (req, res, next) => {

    const { quizId, answer, testId } = req.body

    const isCorrect = await correct(quizId, answer);

    const [error, document] = await handle(
        User.findByIdAndUpdate(req.userId, {
            $addToSet: {
                histories: {
                    quizId,
                    score: isCorrect ? (testId ? getScore(testId) : 1) : 0,
                    answer: answer,
                    mode: testId ? ModeTest.TEST : ModeTest.RANDOM
                }
            }
        }, { new: false }).populate('favorites')
    )

    res.send({ message: isCorrect ? 'Right answer' : 'Wrong answer' });

}

exports.lockUser = async (req, res, next) => {
    const { userId } = req.body
    console.log("UserId", userId);
    const [error, document] = await handle(
        User.findByIdAndUpdate(userId, {
            active: false
        })
    )
    if (error) {
        return next(new BadRequestError(400, "Error!"));
    }

    res.send({ message: document });
}

async function correct(quizId, answer) {
    const quiz = await Quiz.findById(quizId)
    if (quiz.type === QuizType.YES_NO) {
        if (answer === quiz.yesNoAnswer) {
            return true;
        }
        return false
    }
    else {
        for (let an of quiz.options) {
            if (an.correct && an.body === answer) {
                return true
            }
        }
        return false
    }
}

//Find all Quiz
exports.getHistories = async (req, res, next) => {
    const userId = req.userId
    const [error, document] = await handle(
        User.findById(userId).populate({
            path: 'histories',
            populate: {
                path: 'quizId',
            }
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all Quizs"
            )
        );
    }

    return res.send(document.histories);
};


async function getScore(testId){
    const [err, test] = await handle(Test.findById(testId));
    if(err){
        throw err
    }
    if(!test.quizes || test.quizes.length === 0){
        return 0
    }
    return Number(test.score) / Number(test.quizes.length);
}