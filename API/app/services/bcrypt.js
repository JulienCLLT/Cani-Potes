const bcrypt = require("bcrypt");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);


async function hash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

// compare return boolean
async function compare(password, hashed) {
    const match = await bcrypt.compare(password, hashed);
    return match;
}

module.exports = { hash, compare };

