const joi = require('joi-plus');


const joiSchema = {

    schemaMember : joi.object({
        email: joi.string().email({maxDomainSegments:4}).lowercase(),
        first_name: joi.string().pattern(/^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'),
        last_name: joi.string().pattern(/^(?=.{3,25}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'), 
        photo: joi.string().escape(), 
        zip_code: joi.string().pattern(/^(?!00|96|99)\d{5}$/).message('Le format du code postal n\'est pas correct'),
        birthday: joi.string().pattern(/^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/).message('Le format de la date n\'est pas correct : YYYY-MM-DD'),
        //birthday:joi.date().format('YYYY-MM-DD'),
        password: joi.string().password({
                min: 8,
                max: 30,
                lowercase: true,
                uppercase: true,
                number: true,
                count: 2 // le mdp dois obligatoirement remplir les 2 premiere exigence
        }), 

    }),

    schemaDog : joi.object({
        surname : joi.string().pattern(/^(?=.{3,15}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/).message('Votre nom ne respecte pas les conditions'), // comme first_name alphanul et lowercase de trop
        description: joi.string().min(10).max(200).escape(),
        weight: joi.number().positive().precision(4).positive(),
        birthday: joi.string().pattern(/^((19\d{2})|(20\d{2}))-(((02)-(0[1-9]|[1-2][0-9]))|(((0(1|[3-9]))|(1[0-2]))-(0[1-9]|[1-2][0-9]|30))|((01|03|05|07|08|10|12)-(31)))$/).message('Le format de la date n\'est pas correct : YYYY-MM-DD'),
        sterilization: joi.boolean(),
        breed_id: joi.number().integer().min(1),
        gender_id: joi.number().integer().min(1),
        behavior_id: joi.number().integer().min(1),
        dog_owner_id: joi.number().integer().min(1) 
    }),

    schemaRide : joi.object({
        title: joi.string().min(10).max(30).escape(),
        description: joi.string().min(10).max(300).escape(),
        start_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)),  
        end_coordinate: joi.array().items(joi.number().min(0).max(90),joi.number().min(0).max(180)), 
        max_number_dogs: joi.number().integer().min(1).max(50),
        tag_id: joi.number().integer().min(1),
        host_id: joi.number().integer().min(1),
        starting_time: joi.string().isoDate(),
        duration: joi.number().min(5),
    }),


    schemaPhoto : joi.object({
        file_name: joi.string().escape(), 
        dog_id: joi.number().integer().min(1)
    }),

    schemaMessage : joi.object({
        member_id: joi.number().integer().min(1),
        ride_id: joi.number().integer().min(1), 
        message: joi.string().max(500).escape()
    }),

    
};




module.exports = joiSchema;







