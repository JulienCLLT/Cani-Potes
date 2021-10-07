const bcrypt = require("bcrypt");


const bcryptService = {

    SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS, 10),

    async hash (password) {
        try {
            const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
            const hashed = await bcrypt.hash(password, salt);
            return hashed;

        } catch (error) {
            throw error;
        }

    },

    async compare (password, hashed) {
        try {
            const match = await bcrypt.compare(password, hashed);
            return match;
            
        } catch (error) {
            throw error; 
        }

    }
};


module.exports = bcryptService ;

