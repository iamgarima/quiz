const crypto = require("crypto");

const secret = "my secret";

const hashPassword = password =>
    crypto
        .createHmac("sha256", secret)
        .update(password)
        .digest("hex");

module.exports = {
    hashPassword
};
