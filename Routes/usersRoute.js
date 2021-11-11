const createHttpError = require("http-errors");
const { validationResult } = require("express-validator");
const { getAllUsers, deleteUser, getUserAccount, updateUser } = require("../models/adminModel");
const { updateUserValidator } = require("../validators/adminValidators");

const userRouter = require("express").Router();

userRouter.get("/", (req, res, next) => {
    getAllUsers().then(rows => {
        res.send(rows);
    });
});

userRouter.get("/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id || "");
    if (!id) next(createHttpError(400, new Error("User not found")));
    getUserAccount(id)
        .then(data => {
            if (!data) return next(createHttpError(404, new Error("User not found")));
            delete data.password;
            return res.json(data);
        })
        .catch(err => next(err));
});

userRouter.put("/", updateUserValidator(), (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return next(createHttpError(400, { errors: result.mapped() }));
    updateUser(req.user, req.body)
        .then(data => res.json(req.body))
        .catch(err => next(createHttpError(400, err)));
});

userRouter.delete("/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id || "");
    if (!id) next(createHttpError(400, new Error("User not found")));
    if (id === 1) return next(createHttpError(400, new Error("Cannot delete root user")));
    deleteUser(req.user, id)
        .then(data => res.status(200).json({ message: "User Deleted" }))
        .catch(err => next(createHttpError(400, err)));
});

module.exports = { userRouter };
