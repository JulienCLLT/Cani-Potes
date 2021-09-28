const joi = require('joi');

// convert par defaut sur on, c'estc e qui change le timstamp? 

const schemaMember = joi.object({
    //todo , ? minDomain a 2 valeur par defaut 
    email:joi.string().email({minDomainSegments:2}).required(),
    //pb prenom composé avec - idem pour nom donc je vite alphanum
    // pas bon lowercase : pk verifier ca ? ils vont plutot ecrire Robert et pas robert.
    first_name: joi.string().min(2).max(15).required(),
    last_name: joi.string().min(3).max(15).required(),
    photo: joi.string().pattern(/^.+\..+$/), //regex identique a dans sql
    zip_code: joi.string().pattern(/^(?!00|96|99)\d{5}$/).required(), // faire plus proche de celle sql pour cherence
    password: joi.string().required(), // avant bcrypt ? donc regex ? 
    birthday: joi.date().required(), // !Definir le format avec le lead Dev front
});

const schemaDog = joi.object({
    surname : joi.string().min(2).max(15).required(), // comme first_name alphanul et lowercase de trop
    description: joi.string().min(10).max(200).required(),
    weight: joi.number().positive().precision(4).positive(),
    birthday: joi.date().required(),//! Definir le format avec le lead Dev front
    sterilization: joi.boolean().required(),
    breed_id: joi.number().integer().min(1),
    gender_id: joi.number().integer().min(1).required(),
    behavior_id: joi.number().integer().min(1).required(),
    dog_owner_id: joi.number().integer().min(1).required() 
});

//todo reporter ces valeurs sur CDC et SQL
// todo manque les require partout
const schemaRide = joi.object({
    // pas alphanum trop restrictif, ni lowercase
    title: joi.string().min(10).max(50),
    description: joi.string().min(10).max(200),
    //pas des string ci dessous numeric
    start_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)), //a finir le joi pour l'index 0 et l'index 1 des array 
    end_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)), 
    //date?
    // on recoit un nombre et nous on met mn pour duration? 
    duration: joi.number().min(5),
    max_number_dogs: joi.number().integer().min(1),
    tag_id: joi.number().integer().min(1),
    host_id: joi.number().integer().min(1),
    // isoDate valide mais change le contnu de la string dans value ? pb ? esg-ce qu'on perd le Tz ?  sauf si on n'utilise pas la value passé dans Joi
    starting_time: joi.string().isoDate(), //!sinon regex
});

const schemaMessage = joi.object({
    member_id: joi.number().integer().min(1),
    ride_id: joi.number().integer().min(1),
    // longueur maxx? 
    message: joi.string().min(10).max(200)
});

const schemaPhoto = joi.object({
    file_name: joi.string().pattern(/^.+\..+$/), //regex
    dog_id: joi.number().integer().min(1)
});


const member = {
    email: "sdfsfs@gmail.io",
    first_name: "Jean-Louis",
    last_name: "porte",
    zip_code: "56326",
    password: "mlodwfjgoeriucxwvjhioifkf",
    birthday: 2043-05-10,
};

const ride = {
    title: 'Une super balade',
    description: 'Par ici tout va bien<p> vous pouvez </p>venir avec moi! ah ah , qu\'en dis tu ? non?',
    start_coordinate: [0.78678, 45.7868],
    end_coordinate: [12.8686, 98.986786], 
    starting_time: '2021-09-27 14:09:37.380537+02',
    duration: 45,
    max_number_dogs: 6,
    tag_id: 2,
    host_id: 3
}

// const { error, value } = schemaMember.validate(member,{escapeHtml: true});
const { error, value } = schemaRide.validate(ride, {escapeHtml : true});

console.log(value);
console.log('error du validate '+ error);




