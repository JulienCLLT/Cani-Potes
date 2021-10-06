const fetch = require('../../node_modules/node-fetch');
//npm i node-fetch@2.6.2 obligé de retrograder la version pour que le require fonctionne 


async function fetchApi (zipcode) {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${zipcode}`);
    const data = await response.json();
    
    if (data.features.length == 0) {
        const placebo = [45.58129716336006, 5.978390832230138];
        return placebo;
    };
    const result = await data.features[0].geometry.coordinates;
    return result.reverse();
    
};


module.exports = fetchApi; 

