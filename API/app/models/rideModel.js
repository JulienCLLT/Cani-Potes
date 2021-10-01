const client = require('../../database');

class Ride {
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        try {
            const query = `SELECT id AS ride_id, start_coordinate FROM ride`;
            const { rows } = await client.query(query);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async findOneCompleteRide(id) {
        try {
            const query = `SELECT * FROM rides_with_all_informations WHERE ride_id=$1`;
            const { rows } = await client.query(query, [id]);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async findById(id) {
        try {
            const query = `SELECT * FROM ride WHERE ride.id = $1`;
            const { rows } = await client.query(query, [id]);
            if (rows[0]) {
                return new Ride(rows[0]);
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async findRidesByMember(userId) {
        try {
            const query = `
                SELECT ride.id AS ride_id, host_id, mp.member_id AS participant FROM ride 
                JOIN member_participate_ride AS mp ON ride.id = mp.ride_id
                WHERE ride.host_id = $1 OR mp.member_id = $1           
            `;
            const { rows } = await client.query(query, [userId]);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteMessagesByRideId(rideId) {
        try {
            const query = `DELETE FROM member_write_ride WHERE ride_id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteAllParticipantsFromRide(rideId) {
        try {
            const query = `DELETE FROM member_participate_ride WHERE ride_id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteRide(rideId) {
        try {
            const query = `DELETE FROM ride WHERE id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteMemberParticipateRide(memberId, rideId) {
        try {
            const query = `DELETE FROM member_participate_ride WHERE ride_id = $1 AND member_id = $2`;
            await client.query(query, [rideId, memberId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async postMemberParticipateRide(memberId, rideId) {
        try {
            const query = `INSERT INTO member_participate_ride(member_id, ride_id) VALUES ($1,$2)`;
            await client.query(query, [memberId, rideId]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    async createRide() {
        try {
            //todo facto : SQL function
            //todo JOI
            const query = `
                INSERT INTO ride(title,description,start_coordinate,end_coordinate, starting_time, duration, max_number_dogs, tag_id, host_id)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
            `;
            const { rows } = await client.query(query, [
                this.title,
                this.description,
                this.start_coordinate,
                this.end_coordinate,
                this.starting_time,
                this.duration,
                Number(this.max_number_dogs),
                Number(this.tag_id),
                Number(this.host_id),
            ])
            return rows[0];

        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
}

module.exports = Ride;