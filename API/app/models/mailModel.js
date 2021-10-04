const database = require('./../database');

class Mail {
    constructor(data={}) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    async save() {
        try {
            const { rows } = await database.query('INSERT INTO member_write_ride (message, ride_id, member_id) VALUES ($1, $2, $3) RETURNING created_at',[
            this.message,
            this.ride_id,
            this.member_id
        ]);
            return rows [0]
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
        
    }
};

module.exports = Mail;
