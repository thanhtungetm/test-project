const { BadRequestError } = require("../helpers/errors")
const handle = require("../helpers/promise")
const db = require("../models")
const Subject = db.Subject

//Find all Subject or by name
exports.findAll = async(req, res, next) => {
    const [error, documents] = await handle(
        Subject.find()
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "Error find all subjects"
            )
        );
    }

    return res.send(documents);
};

exports.createSubject = async(req, res, next)=>{
    const {name} = req.body

    const subject = new Subject({
        name: name
    });

    const [error] = await handle(subject.save());

    if (error) {
        return next(new BadRequestError(400, "Error!"));
    }

    res.send({ message: "Create a subject successfully!" });
}

