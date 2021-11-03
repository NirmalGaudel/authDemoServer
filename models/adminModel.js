const client = require("../database/db");

function createAccount(payload) {
    return new Promise((resolve, reject) => {
        const { username, firstname, lastname, password } = payload;
        const query = {
            text: `INSERT INTO public."Users" ( username, firstname, lastname, password ) VALUES($1, $2, $3, $4)`,
            values: [username, firstname, lastname, password],
        };

        client.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function getUserAccount(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * FROM "public"."Users" WHERE id = $1',
            values: [id],
        };

        client.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function getUserAccountByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = {
            text: `SELECT * FROM "public"."Users" WHERE username = $1 `,
            values:[username]
        };

        client.query(query, (err, res) =>
            err ? reject(err) : resolve(res.rows[0] || null)
        );
    });
}

function checkLogin(payload) {
    return new Promise((resolve, reject) => {
        const { username, password } = payload;
        const query = {
            text: `SELECT * FROM "public"."Users" WHERE username = '${username}' AND password = '${password}'`,
        };
        client.query(query, (err, res) =>
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
