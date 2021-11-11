const client = require("../database/db");

function createAccount(payload) {
    return new Promise((resolve, reject) => {
        const { username, firstname, lastname, password } = payload;
        const query = {
            text: `INSERT INTO public."Users" ( username, firstname, lastname, password ) VALUES($1, $2, $3, $4)`,
            values: [username, firstname, lastname, password],
        };

        client.query(query, (err, res) => (err ? reject(err) : resolve(res.rows[0] || null)));
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * FROM "public"."Users" ',
        };

        client.query(query, (err, res) =>
            err
                ? reject(err)
                : resolve({
                      count: res.rowCount,
                      rows: res.rows,
                  })
        );
    });
}

function getUserAccount(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * FROM "public"."Users" WHERE id = $1',
            values: [id],
        };

        client.query(query, (err, res) => (err ? reject(err) : resolve(res.rows[0])));
    });
}

function getUserAccountByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = {
            text: `SELECT * FROM "public"."Users" WHERE username = $1 `,
            values: [username],
        };

        client.query(query, (err, res) => (err ? reject(err) : resolve(res.rows[0] || null)));
    });
}

function checkLogin(payload) {
    return new Promise((resolve, reject) => {
        const { username, password } = payload;
        const query = {
            text: `SELECT * FROM "public"."Users" WHERE username = '${username}' AND password = '${password}'`,
        };
        client.query(query, (err, res) => (err ? reject(err) : resolve(res.rows[0] || null)));
    });
}

function deleteUser(user, id) {
    return new Promise((resolve, reject) => {
        if (user.id === id || user.role === "admin") {
            const query = {
                text: 'DELETE FROM "public"."Users" WHERE id = $1',
                values: [id],
            };
            client.query(query, (err, res) => (err ? reject(err) : resolve()));
        } else reject("Operation not allowed");
    });
}

function updateUser(user, payload) {
    return new Promise((resolve, reject) => {
        const { id, username, firstname, lastname } = payload;
        if (!(user.id === id || user.role === "admin")) return reject("Operation not allowed");
        const query = {
            text: 'UPDATE "public"."Users" SET username = $2, firstname = $3, lastname = $4 WHERE id = $1',
            values: [id,username, firstname, lastname],
        };
        client.query(query, (err, res) => (err ? reject(err) : resolve(res)));
    });
}

module.exports = {
    createAccount,
    getUserAccount,
    getUserAccountByUsername,
    checkLogin,
    getAllUsers,
    deleteUser,
    updateUser
};
