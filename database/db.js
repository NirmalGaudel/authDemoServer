const { Client } = require("pg");
const DBOptions = require("./dbConfig");

const client = new Client(DBOptions);

client.connect((err) => {
    if (err) {
        console.error("Database Connection Failed !!!", err);
        process.exit();
    }
});

module.exports = client;
