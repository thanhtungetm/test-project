const express = require("express");
const quizes = require("../controllers/quiz.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");

module.exports = app => {
    const router = express.Router();
    router.get("/", quizes.findAll);
    router.get("/random",[verifyToken], quizes.randomAQuiz);
    router.post("/",[verifyToken, verifyAdmin], quizes.createQuiz);


    app.use("/api/quizes", router);
};