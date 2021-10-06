const bcrypt = require("bcrypt");


const bcryptService = {

    SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS, 10),

    async hash (password) {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    },

    async compare (password, hashed) {
        const match = await bcrypt.compare(password, hashed);
        return match;
    }
};


module.exports = bcryptService ;

