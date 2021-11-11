const { body } = require("express-validator");
const { getUserAccountByUsername, getUserAccount } = require("../models/adminModel");

function createAccountValidator() {
    return [
        body("username")
            .exists()
            .withMessage("username is required")
            .custom(
                username =>
                    new Promise(async (resolve, reject) => {
                        const result = await getUserAccountByUsername(username).catch(e =>
                            reject(e)
                        );
                        if (result) reject("Username Already Exists");
                        else resolve();
                    })
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

function updateUserValidator() {
    return [
        body("id")
            .exists()
            .withMessage("id is required")
            .custom(
                id =>
                    new Promise(async (resolve, reject) => {
                        const result = await getUserAccount(id).catch(e => reject(e));
                        if (!result) reject("User doesn't exist");
                        else resolve();
                    })
            ),
        body("username")
            .exists()
            .withMessage("username is required")
            .custom(
                un =>
                    new Promise(async (resolve, reject) => {
                        const result = await getUserAccountByUsername(un).catch(e => reject(e));
                        if (result) reject("Username Already Exists");
                        else resolve();
                    })
            ),

        body("firstname").exists().withMessage("firstname is required"),
        body("lastname").exists().withMessage("lastname is required"),
    ];
}

module.exports = { loginValidator, createAccountValidator,updateUserValidator };
