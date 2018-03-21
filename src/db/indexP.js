const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'gk',
    host: 'localhost',
    port: '5432',
    database: 'quiz'
});

const query = (text, params) => {
    return pool.query(text, params);
};


module.exports = {
    query
}
