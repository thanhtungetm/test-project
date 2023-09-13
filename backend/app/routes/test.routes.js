const express = require("express");
const tests = require("../controllers/test.controller");

module.exports = app => {
    const router = express.Router();
    router.get("/", tests.findAll);
    router.post("/random", tests.randomQuizesInTest);
    router.post("/", tests.createTest);


    app.use("/api/test", router);
};