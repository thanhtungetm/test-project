const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const User = db.User;

exports.signup = async(req, res, next) => {
    console.log(req.body)
    const user = new User({
        username: req.body.username,
        phone: req.body.phone,
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    const [error] = await handle(user.save());

    if (error) {
        let statusCode = 400;
        let { username = {}, password = {} } = error.errors;

        const errorMessage =
            username.message || password.message;
        if (!errorMessage) {
            statusCode = 500;
        }

        return next(new BadRequestError(statusCode, errorMessage));
    }

    res.send({ message: "Dang ky thanh cong" });
};

exports.signin = async(req, res, next) => {
    const [error, user] = await handle(
        User.findOne({
            username: req.body.username,
            active: true
        }).exec()
    );

    if (error) {
        return next(new BadRequestError(500));
    }

    if (!user) {
        return next(new BadRequestError(401, "Incorrect username or password"));
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return next(new BadRequestError(401, "Incorrect username or password"));
    }

    const token = jwt.sign({ id: user.id, role:user.role }, config.jwt.secret, {
        expiresIn: 86400,
    });

    res.status(200).send({
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
        accessToken: token,
    });
};