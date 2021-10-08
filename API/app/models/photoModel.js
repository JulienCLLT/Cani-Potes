const client = require("../database");
const fs = require('fs');
const { delOldImage } = require("../services/sharp");

class Photo {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }


    async addPhoto() {
        try {
            const query = `INSERT INTO photo(file_name, dog_id)
                        VALUES ($1, $2) RETURNING *`;
            const { rows } = await client.query(query, [
                this.file,
                this.dogId,
            ])
            this.id = rows[0].id;
            return rows[0];
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deletePhotos(dogId) {
        try {
            const { rows: photoToDelete } = await client.query(`SELECT file_name FROM photo WHERE dog_id = $1`, [dogId]);
            await client.query(`DELETE FROM photo WHERE dog_id = $1`, [dogId]);

            delOldImage('dog_resized', photoToDelete[0].file_name);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteOnePhoto(photoId) {
        try {
            await client.query(`DELETE FROM photo WHERE id = $1`, [photoId]);
            // delete vraiment tof
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }



}

module.exports = Photo;
