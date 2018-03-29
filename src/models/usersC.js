const db = require("../db");

exports.addUser = (email, password, cb) => {
    const text = "INSERT INTO users(email, password) values($1, $2)";
    db.query(text, [email, password], (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result.rows);
        }
    });
};

exports.getUser = (email, cb) => {
    const text = "SELECT * from users where email=$1";
    db.query(text, [email], (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result.rows);
        }
    });
};

exports.checkUser = (id, cb) => {
    const text = "SELECT * from users where id=$1";
    db.query(text, [id], (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result.rows);
        }
    });
};
