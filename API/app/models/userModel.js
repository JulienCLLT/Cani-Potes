const database = require('../database');

class UserModel {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    }

    static async login(email) {
        try {
            const { rows } = await database.query('SELECT email, password, id FROM member WHERE email=$1', [email]);
            //return new UserModel(rows[0]) ; quelle version est plus propre ?
            return rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }


    static async findOne(userId) {
        try {
            const { rows } = await database.query('SELECT id, photo FROM member WHERE id=$1', [userId]);
            //return new UserModel(rows[0]) ; quelle version est plus propre ?
            return rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    async save() {
        try {
            if (this.id) {
                // faire un fonction d'update dynamique en sql;

                const { rows } = await database.query(`SELECT update_user($1)`,[this]);


            }
            else {
                const {rows}= await database.query('SELECT insert_user($1)',[this]);
                
                //return le nouvelle id de l'insert
                this.id = rows[0].insert_user;
                return this;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }





    static async dataUserConnexion(id) {
        try {
            const { rows } = await database.query('SELECT * FROM user_basic_information WHERE id = $1', [id]);
            return rows[0];
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }

    }

    static async fullProfile(idUser) {
        try {
            const { rows } = await database.query('SELECT * FROM full_profile WHERE member_id = $1', [idUser]);
            return rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    static async deleteMember(userId) {
        try {
            const query = `DELETE FROM member WHERE id = $1`;
            await database.query(query, [userId]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

};
module.exports = UserModel;
