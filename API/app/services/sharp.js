const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sharpResizeImage = {

    async sharpResize ({request},pathfile){

        await sharp(request.file.path).resize(200, 200)
        .jpeg({ quality: 90 })
        .toFile(path.resolve(
            request.file.destination, `${pathfile}`, request.file
            ));

        fs.unlinkSync(request.file.path);

        
    }

};

module.exports = sharpResizeImage;
