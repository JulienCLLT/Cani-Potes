const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sharpResizeImage = {
    async sharpResize(request, nameFolderStore) {
        try {
            await sharp(request.path).resize(200, 200)
                .jpeg({ quality: 90 })
                .toFile(path.resolve(
                    request.destination, `${nameFolderStore}`, request.filename
                ));

            fs.unlinkSync(request.path);
        } catch (error) {
            throw error;
        }
    },

    delOldImage: (nameFolderStore, nameOldImage,) => {
        fs.unlinkSync(`public/${nameFolderStore}/${nameOldImage}`);
    }

};

module.exports = sharpResizeImage;
