const client = require("./../database");

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
            const query = `DELETE FROM photo WHERE dog_id = $1`;
            await client.query(query, [dogId]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }


}

module.exports = Photo;
