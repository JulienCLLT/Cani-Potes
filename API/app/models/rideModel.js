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

    static async findById(id) {
        try {
            // todo verif id ? 
            const query = `SELECT * FROM ride WHERE ride.id = $1`;
            const {rows} = await client.query(query, [id]);
            if (rows[0]) {
                return new Ride(rows[0]);
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async delete() {
        try {


        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Ride;