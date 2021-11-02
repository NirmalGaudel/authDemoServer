const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const { checkLogin, createAccount } = require("../models/adminModel");
const { generateAuthToken } = require("../token/jwt");
const {
    loginValidator,
    createAccountValidator,
} = require("../validators/adminValidators");

const authRouter = require("express").Router();

authRouter.post("/login", loginValidator(), (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty())
        return next(createHttpError(400, { errors: result.mapped() }));
    checkLogin(req.body)
        .then((data) => {
            if (!data)
                return res
                    .status(401)
                    .json({ message: "Invalid Username or Password" });
            else {
                const { id, username, firstname, lastname } = data;
                const userInfo = { id, username, firstname, lastname };
                generateAuthToken(userInfo)
                    .then((token) => res.status(200).json({ token, userInfo }))
                    .catch((err) => next(err));
            }
        })
        .catch((err) => next(err));
});

authRouter.post(
    "/signup",
    createAccountValidator(),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty())
            return next(createHttpError(400, { errors: result.mapped() }));
        createAccount(req.body)
            .then((data) => {
                checkLogin(data)
                    .then((data) => {
                        if (!data)
                            return res
                                .status(401)
                                .json({
                                    message: "Invalid Username or Password",
                                });
                        else {
                            const { id, username, firstname, lastname } = data;
                            const userInfo = {
                                id,
                                username,
                                firstname,
                                lastname,
                            };
                            generateAuthToken(userInfo)
                                .then((token) =>
                                    res.status(200).json({ token, userInfo })
                                )
                                .catch((err) => next(err));
                        }
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    }
);

module.exports = { authRouter };
