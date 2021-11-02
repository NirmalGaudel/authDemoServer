const db = require("../database/db");

function createAccount(payload) {
    return new Promise((resolve, reject) => {
        const { username, firstname, lastname, password } = payload;
        const query = {
            text: "INSERT INTO Users( username, firstname, lastname, password ) VALUES($1, $2, $3, $4)",
            values: [username, firstname, lastname, password],
        };

        db.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function getUserAccount(id) {
    return new Promise((resolve, reject) => {
        const query = {
            name: "fetch-admin",
            text: 'SELECT * FROM "public"."Users" WHERE id = $1',
            values: [id],
        };

        db.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function getUserAccountByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = {
            name: "fetch-admin",
            text: "SELECT * FROM users WHERE username = $1",
            values: [username],
        };

        db.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function checkLogin(payload) {
    return new Promise((resolve, reject) => {
        const { username, password } = payload;
        const query = {
            text: "SELECT * FROM users WHERE username = $1 AND password = $2",
            values: [username, password],
        };
        db.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

module.exports = {
    createAccount,
    getUserAccount,
    getUserAccountByUsername,
    checkLogin,
};
