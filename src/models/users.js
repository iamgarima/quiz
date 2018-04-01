const db = require("../db");
const { validateEmail, validatePassword } = require("../helpers/validations");
const { hashPassword } = require("../helpers/hashPassword");

const addUser = async (email, password) => {
    if (!validateEmail(email)) {
        console.log("bad email"); // eslint-disable-line no-console
        throw new Error("Bad Email"); // these are not being read in the controller
    }
    if (!validatePassword(password)) {
        console.log("bad password"); // eslint-disable-line no-console
        throw new Error("Bad Password");
    }
    try {
        const result = await db.query(
            "Insert into users(email, password) values($1, $2) returning(id, email)",
            [email, hashPassword(password)]
        );
        return result.rows[0];
    } catch (err) {
        console.log("Error from addUser model: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getUserGivenEmail = async email => {
    try {
        const result = await db.query(
            "Select * from users where email=$1 returning(id, email)",
            [email]
        );
        return result.rows[0];
    } catch (err) {
        console.log("Error from getUserGivenEmail model: ", err); // eslint-disable-line no-console
        throw err;
    }
};

const getUserGivenId = async userId => {
    try {
        const result = await db.query(
            "Select * from users where id=$1 returning(id, email)",
            [userId]
        );
        return result.rows[0];
    } catch (err) {
        console.log("Error from getUserGivenId model: ", err); // eslint-disable-line no-console
        throw err;
    }
};

module.exports = {
    addUser,
    getUserGivenEmail,
    getUserGivenId
};
