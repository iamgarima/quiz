const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const query = (text, params) => pool.query(text, params);

(async () => {
    const text =
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT, password TEXT); CREATE TABLE IF NOT EXISTS options (id SERIAL PRIMARY KEY, text TEXT); CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, text TEXT, options INTEGER[]); CREATE TABLE IF NOT EXISTS solutions (qId INTEGER, ansId INTEGER);";
    try {
        const result = await query(text, []);
        console.log("Tables creation successfull", result);
    } catch (err) {
        console.log("Error while creating tables", err);
    }
})();

module.exports = {
    query
};
