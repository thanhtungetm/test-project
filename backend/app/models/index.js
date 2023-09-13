const mongoose = require("mongoose");
const createUserModel = require("./user.model");
const createLevelModel = require("./level.model")
const createQuizModel = require("./quiz.model")
const createSubjectModel = require("./subject.model")
const createTestModel = require("./test.model")

const db = {};
db.mongoose = mongoose;
db.User = createUserModel(mongoose);
db.Level = createLevelModel(mongoose);
db.Quiz = createQuizModel(mongoose);
db.Subject = createSubjectModel(mongoose);
db.Test = createTestModel(mongoose);

module.exports = db;