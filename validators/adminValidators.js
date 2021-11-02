const { body } = require("express-validator");
const { getUserAccountByUsername } = require("../models/adminModel");

function createAccountValidator() {
    return [
        body("username")
            .exists()
            .withMessage("username is required")
            .custom((username) =>
                getUserAccountByUsername(username)
                    .then((d) =>
                        d
                            ? Promise.reject("username already exists")
                            : Promise.resolve()
                    )
                    .catch((err) => Promise.reject(err.message||"db Error"))
            ),
        body("firstname").exists().withMessage("firstname is required"),
        body("lastname").exists().withMessage("lastname is required"),
        body("password")
            .trim()
            .exists()
            .withMessage("password is required")
            .isLength({ min: 5 })
            .withMessage("password must have at least 5 characters"),
    ];
}

function loginValidator() {
    return [
        body("username").exists().withMessage("username is required"),
        body("password").exists().withMessage("password is required"),
    ];
}

module.exports = { loginValidator, createAccountValidator };
