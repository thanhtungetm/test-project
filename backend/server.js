const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const { BadRequestError } = require("./app/helpers/errors");
const setupAuthRoutes = require("./app/routes/auth.routes");
const setupSubjectRoutes = require("./app/routes/subject.routes");
const setupQuizRoutes = require("./app/routes/quiz.routes");
const setupTestRoutes = require("./app/routes/test.routes");
const setupUserRoutes = require("./app/routes/user.routes");

const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

// home route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to T-Quiz app" });
});

setupAuthRoutes(app);
setupSubjectRoutes(app);
setupQuizRoutes(app);
setupTestRoutes(app);
setupUserRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

// use middleware last
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// set Port
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});