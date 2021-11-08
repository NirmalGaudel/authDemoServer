const tokenValidator = require("../middlewares/tokenValidator");
const { getAllUsers } = require("../models/adminModel");

const userRouter = require("express").Router();

userRouter.get("/",(req,res,next)=>{
    getAllUsers().then(rows=>{
        res.send(rows);
    })
})


module.exports = { userRouter };
