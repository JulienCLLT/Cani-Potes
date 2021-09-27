const joi = require('joi');

const schemaMember = joi.object({
    email:joi.string().email({minDomainSegments:2,}),
    first_name: joi.string().alphanum().min(2).max(15).lowercase(),
    last_name: joi.string().alphanum().min(3).max(15).lowercase(),
    // photo
    // zip_code: joi.string().pattern(new RegExp('^(?!00|96|99)\d{5}$')),
    zip_code: joi.string().pattern(/^(?!00|96|99)\d{5}$/),
    // password: joi.string(),pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/),
    birthday: joi.date(), // Definir le format avec le lead Dev front

});

const schemaDog = joi.object({
    surname : joi.string().alphanum().min(2).max(15).lowercase(),
    breed_id: joi.number().integer(),
    weight: joi.number().positive().precision(4),
    gender: joi.number().integer(),
    birthday: joi.date(),// Definir le format avec le lead Dev front
    sterilization: joi.boolean(),
});

const schemaRide = joi.object({
    title: joi.string().alphanum().lowercase().min(10).max(50),
    description: joi.string().alphanum().lowercase().min(10).max(200),
    start_coorddinate: joi.array().items(joi.string(),joi.string()), //a finir le joi pour l'index 0 et l'index 1 des array 
    //2.290084,49.897443
    //44.79331340891637, 5.320222238159975 coordoné google map

});


const body = {
    email: "sdfsfs@gmail.io",
    first_name: "Jean",
    last_name: "poRte",
    zip_code: "56326",
    //password: "admin' AND 1=1 OR 1='1",
     password: "<script>alert(1)</script>",

    birthday: 2043-05-10,
};

const { error, value } = schemaMember.validate(body,{escapeHtml: true});

if (error) {
    console.log('error du validate '+ error);
}else{
    console.log(value);
}







