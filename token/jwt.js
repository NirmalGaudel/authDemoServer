const jwt = require("jsonwebtoken");
const secret = process.env.JWTSECRET || "secret";

function generateAuthToken(UserDetails) {
    return new Promise((resolve, reject) => {
        const { id, userneme, firstname, lastname, password } = UserDetails;
        const data = { id, userneme, firstname, lastname, password };
        jwt.sign(data, secret, { expiresIn: "7d" }, (err, token) =>
            err ? reject(err) : resolve(token)
        );
    });
}

function verifyAuthToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) =>
            err ? reject(err) : resolve(data)
        );
    });
}

module.exports = { generateAuthToken, verifyAuthToken };
