const Photo = require('../models/photoModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const photoController = {

    delete: async (request, response) => {
        try {

        } catch (error) {
            response.status(500).json(error.message);
        }
    },

};

module.exports = photoController;