const express = require("express");
const users = require("../controllers/user.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");

module.exports = app => {
    const router = express.Router();
    router.get("/", users.getInfo);
    router.post("/favorite", users.addFavorite);
    router.post("/answer", users.answer);
    router.get("/histories", users.getHistories);
    router.post("/lock",[verifyAdmin], users.lockUser);
    router.get("/all",[verifyAdmin], users.getAllUsers);

    app.use("/api/user",[verifyToken], router);
};