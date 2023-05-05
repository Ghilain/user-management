const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Sebuzukira250",
    host: "localhost",
    port: 5432,
    database: "zplatform"
});

module.exports = pool;