const { Pool } = require("pg");
const { createTables } = require("./create");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const query = (text, params) => pool.query(text, params);

createTables();

module.exports = {
    query
};
