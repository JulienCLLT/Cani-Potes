const client = require('./../database');

class Mail {
    constructor(data={}) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    
};

module.exports = Mail;
