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
                const { rows } = await database.query(`UPDATE member 
                    SET email = $1,
                    first_name = $2, 
                    last_name = $3, 
                    zip_code = $4, 
                     
                    birthday = $5,
                    updated_at = NOW()
                    WHERE id = $6`, [
                    this.email,
                    this.first_name,
                    this.last_name,

                    this.zip_code,

                    this.birthday,
                    this.id,
                ]);


            }
            else {
                // insert a facto en fonction SQL
                const { rows } = await database.query(`INSERT INTO member (email, first_name, last_name, zip_code, password, birthday) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [
                    this.email,
                    this.first_name,
                    this.last_name,

                    this.zip_code,
                    this.password,
                    this.birthday,
                ]);
                //return le nouvelle id de l'insert
                this.id = rows[0].id;
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

    static async deleteMember(idUser) {
        try {

        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

};
module.exports = UserModel;
