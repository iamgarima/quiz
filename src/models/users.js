const db = require("../db");
const { validateEmail, validatePassword } = require("../helpers/validations");
const { hashPassword } = require("../helpers/hashPassword");

const addUser = (email, password) =>
    new Promise((resolve, reject) => {
        if (!validateEmail(email)) {
            reject(new Error("Bad Email"));
            return;
        }
        if (!validatePassword(password)) {
            reject(new Error("Bad Password"));
            return;
        }

        db
            .query(
                "Insert into users(email, password) values($1, $2) returning(id, email)",
                [email, hashPassword(password)]
            )
            .then(result => resolve(result.rows[0]))
            .catch(err => {
                console.log("Error from addUser model: ", err); // eslint-disable-line no-console
                reject(err);
            });
    });

const getUserGivenEmail = email =>
    new Promise((resolve, reject) => {
        db
            .query("Select * from users where email=$1", [email])
            .then(result => resolve(result.rows[0]))
            .catch(err => {
                console.log("Error from getUserGivenEmail model: ", err); // eslint-disable-line no-console
                reject(err);
            });
    });

const getUserGivenId = userId =>
    new Promise((resolve, reject) => {
        db
            .query("Select * from users where id=$1", [userId])
            .then(result => resolve(result.rows[0]))
            .catch(err => {
                console.log("Error from getUserGivenId model: ", err); // eslint-disable-line no-console
                reject(err);
            });
    });

module.exports = {
    addUser,
    getUserGivenEmail,
    getUserGivenId
};
