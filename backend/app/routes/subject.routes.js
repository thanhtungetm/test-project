const express = require("express");
const subjects = require("../controllers/subject.controller");

module.exports = app => {
    const router = express.Router();
    
    router.get("/", subjects.findAll);
    router.post("/", subjects.createSubject);

    app.use("/api/subjects", router);
};