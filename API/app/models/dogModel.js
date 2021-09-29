const client = require('./../database');

class Dog {
    constructor(data={}) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    static async findById(id){
        try {
           const query = `SELECT * FROM dogs_with_all_informations WHERE id=$1`;
           const { rows } = await client.query(query, [id]);
           if(rows[0]) {
               return new Dog(rows[0]);
           }
           return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async create() {
        try {
            //todo faire function sql 
            // verif si prenom existe deja dans BDD avec cet id et ce surname


            
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Dog;

