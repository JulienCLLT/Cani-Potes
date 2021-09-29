const fetch = require('../../node_modules/node-fetch');
//npm i node-fetch@2.6.2 obligé de retrograder la version pour que le require fonctionne 


async function fetchApi (zipcode) {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${zipcode}`);
    const data = await response.json();
    const result = await data.features[0].geometry.coordinates;
    return result.reverse();
   
};

// fetchApi(73230);

module.exports = fetchApi; 

