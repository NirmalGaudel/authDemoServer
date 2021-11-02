const ConnectionString = process.env.CONNECTIONSTRING;

const DBoptions = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
};

module.exports = { ConnectionString } || DBoptions;
