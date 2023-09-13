const auth = require("../controllers/auth.controller");
const middlewares = require("../middlewares");

module.exports = (app) => {
    app.post(
        "/api/signup", [middlewares.checkDuplicateUsername],
        auth.signup
    );
    app.post("/api/signin", auth.signin);
};