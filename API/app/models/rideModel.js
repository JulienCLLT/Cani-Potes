const client = require('../../database');

class Ride {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        try {
            const query = `SELECT * FROM rides_with_all_informations`;
            const {rows} = await client.query(query);
            return rows.map(row => new Ride(row));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async findById(id) {
        try {
            // todo verif id ? 
            const query = `SELECT * FROM ride WHERE ride.id = $1`;
            const {rows} = await client.query(query, [id]);
            if (rows[0]) {
                return new Ride(rows[0]);
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteMessagesByRideId(rideId) {
        try {
            //todo verif id? 
            const query= `DELETE FROM member_write_ride WHERE ride_id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteAllParticipantsFromRide(rideId){
        try {
            //todo verif id? 
            const query= `DELETE FROM member_participate_ride WHERE ride_id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    static async deleteRide(rideId){
        try {
            //todo verif id? 
            const query= `DELETE FROM ride WHERE id = $1`;
            await client.query(query, [rideId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

    // todo faire controller
    static async deleteMemberParticipateRide(memberId, rideId){
        try {
            //todo verif id? 
            const query= `DELETE FROM member_participate_ride WHERE ride_id = $1 AND member_id = $2`;
            await client.query(query, [rideId, memberId]);
            // return qq chose ? 
            return null;
        } catch (error) {
            console.error(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }

}

module.exports = Ride;