const client = require('../database');

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

    static async findRidesHostedBy(userId) {
        try {
            const query = `SELECT * FROM ride WHERE ride.host_id = $1`;
            const { rows } = await client.query(query, [userId]);
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
            // select id from ride where user is enrolled (host or participant)
            const query_id = `
                SELECT DISTINCT id
                FROM ride
                LEFT JOIN member_participate_ride AS mpr ON mpr.ride_id = ride.id 
                WHERE ride.host_id = $1 OR mpr.member_id = $1;
            `;
            const idRide = await client.query(query_id, [userId]);
            const arrayId = idRide.rows.map(elem => elem.id);

            // select rides where id 
            const query = `SELECT * FROM rides_by_member WHERE id = ANY($1)`;
            const { rows } = await client.query(query, [arrayId]);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    //todo autre Model ? 
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

    static async deleteMessagesFromMember(memberId) {
        try {
            const query = `DELETE FROM member_write_ride WHERE member_id = $1`;
            await client.query(query, [memberId]);
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

    static async deleteParticipationsOfOneMember(memberId) {
        try {
            const query = `DELETE FROM member_participate_ride WHERE member_id = $1`;
            await client.query(query, [memberId]);
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteAllRidesCreatedBy(userId) {
        try {
            const query = `DELETE FROM ride WHERE host_id = $1`;
            await client.query(query, [userId]);
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