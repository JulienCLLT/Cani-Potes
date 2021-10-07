const client = require('../database');

class Breed {
    constructor(data={}) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    static async findAll(){
        try {
           const query = `SELECT id, label FROM breed`;
           const { rows } = await client.query(query);
           return rows.map(row => new Breed(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Breed;

