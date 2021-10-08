const joi = require('joi-plus');


const joiSchema = {

    schemaMessage : joi.object({
        member_id: joi.number().integer().min(1),
        ride_id: joi.number().integer().min(1), 
        message: joi.string().max(500).escape()
    }),

    schemaMember : joi.object({
        email: joi.string().email({maxDomainSegments:4}),
        first_name: joi.string().pattern(/^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'), // regex alphanum qui authorise les nom composé avec uniquement le -
        last_name: joi.string().pattern(/^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'), 
        photo: joi.string().escape(), 
        zip_code: joi.string().pattern(/^(?!00|96|99)\d{5}$/),
        birthday: joi.string().pattern(/^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/).message('la date de respecte pas le format YYYY-MM-DD'),
        
        password: joi.string().password({
                min: 8,
                max: 20,
                lowercase: true,
                uppercase: true,
                number: true,
                count: 2 // le mdp dois obligatoirement remplir les 2 premiere exigence
        }), // avant bcrypt ? donc regex ? 

    }),

    schemaRide : joi.object({
        title: joi.string().min(10).max(100).escape(),
        description: joi.string().min(10).max(300).escape(),
        start_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)),  
        end_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)), 
        max_number_dogs: joi.number().integer().min(1).max(50),
        tag_id: joi.number().integer().min(1),
        host_id: joi.number().integer().min(1),

        //log du front pour voir ce qui arrive

        // isoDate valide mais change le contnu de la string dans value ? pb ? esg-ce qu'on perd le Tz ?  sauf si on n'utilise pas la value passé dans Joi
        starting_time: joi.string().isoDate(), //!sinon regex
        duration: joi.number().min(5),
    }),

    schemaDog : joi.object({
        surname : joi.string().pattern(/^(?=.{3,15}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'), // comme first_name alphanul et lowercase de trop
        description: joi.string().min(10).max(200).escape(),
        weight: joi.number().positive().precision(4).positive(),
        birthday: joi.string().pattern(/^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/).message('la date de respecte pas le format YYYY-MM-DD'),
        sterilization: joi.boolean(),
        breed_id: joi.number().integer().min(1),
        gender_id: joi.number().integer().min(1),
        behavior_id: joi.number().integer().min(1),
        dog_owner_id: joi.number().integer().min(1) 
    }),


    schemaPhoto : joi.object({
        file_name: joi.string().pattern(/^.+\..+$/), //regex
        dog_id: joi.number().integer().min(1)
    }),
    
};




const schemaMessage = joi.object({
    member_id: joi.number().integer().min(1),
    ride_id: joi.number().integer().min(1),
    // longueur maxx? 
    message: joi.string().max(200)
});



const member = {
    email: "sdfsfs@gmail.io",
    first_name: "jean-philippe",
    last_name: "poRte",
    zip_code: "56326",
    password: "azerty65",
    //password: "admin' AND 1=1 OR 1='1",
   // password: "<script>alert(1)</script>",
   //photo: "C://bobouboule.jpg",
   birthday: "2043-05-10"
};

const ride = {
    title: 'Une super <p>balade</p>',
    description: 'Par ici :) tout va bien<p> vous pouvez </p>venir avec moi! ah ah , qu\'en dis tu ? non?',
    start_coordinate: [0.786783, 45.7868],
    end_coordinate: [12.8686, 98.986786], 
    starting_time: '2021-09-27 14:09:37.380537+02',
    duration: 45,
    max_number_dogs: 48,
    tag_id: 2,
    host_id: 3
};

const dog = {
    surname : "paul", 
    description: "un chien fou" ,
    weight: 12 ,
    birthday: "2003-05-10",
    breed_id: 1,
    gender_id: 1,
    behavior_id: 1,
    dog_owner_id:23
};


const { error, value } = joiSchema.schemaDog.validate(dog,{escapeHtml: true});
// const { error, value } = schemaRide.validate(ride, {escapeHtml : true});

if (error) {
    console.log('error du validate '+ error);
}else{
    console.log(value);
}

module.exports = schemaMessage;







