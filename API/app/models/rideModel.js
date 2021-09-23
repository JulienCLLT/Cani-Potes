const client = require('../../database');

class Ride {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        try {
            const query = `SELECT * FROM rides_with_all_informations`;
            const {rows} = await client.query(query);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Ride;