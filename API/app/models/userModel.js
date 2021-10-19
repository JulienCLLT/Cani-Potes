const client = require('../database');


class UserModel {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    }

    static async login(email) {
        try {
            const { rows } = await client.query('SELECT email, password, id FROM member WHERE email=$1', [email]);
            //return new UserModel(rows[0]) ; quelle version est plus propre ?
            return rows[0];

        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }
    }


    static async findOne(userId) {
        try {
            const { rows } = await client.query('SELECT id, photo FROM member WHERE id=$1', [userId]);
            //return new UserModel(rows[0]) ; quelle version est plus propre ?
            return rows[0];

        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async save() {
        try {
            if (this.id) {
                const { rows } = await client.query(`SELECT update_user($1)`, [this]);
            }
            else {
                const { rows } = await client.query('SELECT insert_user($1)', [this]);
                this.id = rows[0].insert_user;
                return this;
            }
        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async dataUserConnexion(id) {
        try {
            const { rows } = await client.query('SELECT * FROM user_basic_information WHERE id = $1', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }

    }

    static async fullProfile(idUser) {
        try {
            const { rows } = await client.query('SELECT * FROM full_profile WHERE member_id = $1', [idUser]);
            return rows[0];

        } catch (error) {
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteMember(userId) {
        try {
            const query = `DELETE FROM member WHERE id = $1`;
            await client.query(query, [userId]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

};
module.exports = UserModel;
