const db = require("../db/indexP.js");

const addUser = (email, password) =>
    db
        .query(
            "Insert into users(email, password) values($1, $2) returning(id, email)",
            [email, password]
        )
        .then(result => result.rows)
        .catch(err => {
            console.log("Error from addUser model: ", err);
            return err;
        });

const getUserGivenEmail = email =>
    db
        .query("Select * from users where email=$1", [email])
        .then(result => result.rows)
        .catch(err => {
            console.log("Error from getUserGivenEmail model: ", err);
            return err;
        });

const getUserGivenId = userId =>
    db
        .query("Select * from users where id=$1", [userId])
        .then(result => result.rows)
        .catch(err => {
            console.log("Error from getUserGivenId model: ", err);
            return err;
        });

module.exports = {
    addUser,
    getUserGivenEmail,
    getUserGivenId
};
