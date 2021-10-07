const client = require('../database');

class Dog {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findById(id) {
        try {
            const query = `SELECT * FROM dogs_with_all_informations WHERE id=$1`;
            const { rows } = await client.query(query, [id]);
            if (rows.length > 0) {
                return new Dog(rows[0]);
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async findDogFromMember(userId) {
        try {
            const query = `SELECT id FROM dog WHERE dog_owner_id = $1`;
            const { rows } = await client.query(query, [userId]);
            return rows.map(row => new Dog(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async create() {
        try {
            // verif si prenom existe deja dans BDD avec cet id et ce surname
            const query = `INSERT INTO dog(surname, description, weight, birthday, sterilization, breed_id, gender_id, behavior_id, dog_owner_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

            const { rows } = await client.query(query, [
                this.surname,
                this.description,
                parseFloat(this.weight),
                this.birthday,
                this.sterilization,
                Number(this.breed_id),
                Number(this.gender_id),
                Number(this.behavior_id),
                Number(this.dog_owner_id),
            ]);

            this.id = rows[0].id;
            return rows[0];
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }


    static async delete(id) {
        try {
            const query = `DELETE FROM dog WHERE id = $1`;
            await client.query(query, [id]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async save() {
        try {
            const query = `SELECT update_dog($1)`;
            const { rows } = await client.query(query, [this]);
            return rows[0];
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }


}

module.exports = Dog;

