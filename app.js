const express = require("express");
const app = express();
const cors = require("cors");
const makeError = require("http-errors");
require("dotenv").config();
const db = require("./database/db");
const { authRouter } = require("./Routes/authRoute");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/auth",authRouter);

app.use((req, res, next) => next(makeError(404, "not found")));

app.use((err, req, res, next) => {
    console.error(err);
    return res
        .status(err.status || 500)
        .json({ message: err.message || "Server Error" ,...err});
});

db.once("connect", () => {
    console.log("DATABASE CONNECTED !!");
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
});
