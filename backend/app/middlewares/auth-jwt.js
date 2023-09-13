const jwt = require("jsonwebtoken");
const config = require("../config");
const { BadRequestError } = require("../helpers/errors");

const verifyToken = (req, res, next) => {
    const authHeader = String(req.headers.authorization || "");
    let token = null;

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    }

    if (!token) {
        return next(new BadRequestError(401, "Unauthorized"));
    }

    jwt.verify(token, config.jwt.secret, (error, decoded) => {
        if (error) {
            console.log(error);
            return next(new BadRequestError(401, "Unauthorized"));
        }
        req.userId = decoded.id;
        req.role = decoded.role
        console.log("Decode", decoded);
        return next();
    });
};
const verifyAdmin = (req, res, next) => {
    if(req.role === 'Admin')
        return next();
    return next(new BadRequestError(401, "Not Admin"));
};

module.exports = {
    verifyToken,
    verifyAdmin
};
