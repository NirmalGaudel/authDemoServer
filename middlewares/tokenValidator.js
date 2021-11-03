const createHttpError = require("http-errors");
const { getUserAccount } = require("../models/adminModel");
const { verifyAuthToken } = require("../token/jwt");

function tokenValidator(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1]; // Bearer token
    req.user = verifyAuthToken(token)
        .then((d) => {
            const { id } = d;
            getUserAccount(id)
                .then((user) => (req.user = { ...user, password: undefined }))
                .catch((e) => next(createHttpError(401, e)))
                .finally((_) => next());
        })
        .catch((e) => next(createHttpError(401, e)));
}

module.exports = tokenValidator;
