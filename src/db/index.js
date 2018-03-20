const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'gk',
    host: 'localhost',
    port: 5432,
    database: 'quiz'
});


module.exports = {
    query: (text, params, cb) => {
        return pool.query(text, params, cb);
    }
};