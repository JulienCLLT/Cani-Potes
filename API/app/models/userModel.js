const database = require('../database');

class UserModel {
    constructor(data ={}){
        for (const prop in data) {
            this[prop] = data[prop];
        };
    }

    static async findOne(id) {
        try {
            const { rows } = await db.query('SELECT * FROM WHERE id=$1', [id]);
            if (rows[0]) {
                return new UserModel(rows[0]);
            }
            return null;
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    async save(){
        try {
            if(this.id){
                // update
                await database.query(`UPDATE member SET`)
            }
            else{
                // insert a facto en fonction SQL
                const {rows} = await database.query(`INSERT INTO member (email, first_name, last_name, zip_code, password, birthday) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,[
                this.email,
                this.first_name,
                this.last_name,
                this.zip_code,
                this.password,
                this.birthday,
            ]);
            this.id = rows[0].id;
            return this;
            }
        } catch (error) {
            console.log(error);
        }
    }


};
module.exports = UserModel;
