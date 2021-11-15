const { body } = require("express-validator");
const { getUserAccountByUsername, getUserAccount } = require("../models/adminModel");

function createAccountValidator() {
    return [
        body("username")
            .trim()
            .exists()
            .withMessage("username is required")
            .isLength({ min: 2 })
            .withMessage("username must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("username must have less than 20 characters")
            .custom(
                un =>
                    new Promise(async (resolve, reject) => {
                        const result = await getUserAccountByUsername(un).catch(e => reject(e));
                        if (result) reject("Username Already Exists");
                        else resolve();
                    })
            ),

        body("firstname")
            .trim()
            .exists()
            .withMessage("firstname is required")
            .isLength({ min: 2 })
            .withMessage("firstname must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("firstname must have less than 20 characters"),
        body("lastname")
            .trim()
            .exists()
            .withMessage("lastname is required")
            .isLength({ min: 2 })
            .withMessage("lastname must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("lastname must have less than 20 characters"),
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
            .trim()
            .exists()
            .withMessage("username is required")
            .isLength({ min: 2 })
            .withMessage("username must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("username must have less than 20 characters")
            .custom(
                un =>
                    new Promise(async (resolve, reject) => {
                        const result = await getUserAccountByUsername(un).catch(e => reject(e));
                        if (result) reject("Username Already Exists");
                        else resolve();
                    })
            ),

        body("firstname")
            .trim()
            .exists()
            .withMessage("firstname is required")
            .isLength({ min: 2 })
            .withMessage("firstname must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("firstname must have less than 20 characters"),
        body("lastname")
            .trim()
            .exists()
            .withMessage("lastname is required")
            .isLength({ min: 2 })
            .withMessage("lastname must have at least 2 characters")
            .isLength({ max: 20 })
            .withMessage("lastname must have less than 20 characters"),
    ];
}

module.exports = { loginValidator, createAccountValidator, updateUserValidator };
