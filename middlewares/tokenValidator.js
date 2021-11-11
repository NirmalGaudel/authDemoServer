const createHttpError = require("http-errors");
const { getUserAccount } = require("../models/adminModel");
const { verifyAuthToken } = require("../token/jwt");

function tokenValidator(req, res, next) {
    const authorization = req.headers.authorization;
    if(!authorization) next(createHttpError(401,new Error("Session Expired")))
    const token = authorization.split(" ")[1]; // Bearer token
    req.user = verifyAuthToken(token)
        .then(d => {
            const { id } = d;
            getUserAccount(id)
                .then(user => {
                    if (!user) next(createHttpError(401));
                    req.user = { ...user, password: undefined, role: id === 1 ? "admin" : "user" };
                })
                .catch(e => next(createHttpError(401, e)))
                .finally(_ => next());
        })
        .catch(e => next(createHttpError(401, e)));
}

module.exports = tokenValidator;
