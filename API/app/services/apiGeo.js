const fetch = require('../../node_modules/node-fetch');
//npm i node-fetch@2.6.2 obligé de retrograder la version pour que le require fonctionne 


async function fetchApi(obj) {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${obj}`);
    const data = await response.json();
    console.log(data.features[0]);
};

fetchApi(73230);
