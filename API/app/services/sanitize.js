
const joi = require('joi-plus');


const schemaTest = joi.object({
    email: joi.string().email().required(),
    photo: joi.string(),
    first_name: joi.string().escape(),
    last_name:joi.string().escape(),
});


const test = {
    email: "pauljet@email.com",
    photo: "c://photo.xss",//validator.escape
    first_name: "<script>evil_script()</script>",//validator.escape
    last_name:" password' OR 1='1" //validator.escape

};

const { error, value } = schemaTest.validate(test, {escapeHtml : true});

if (error) {
    console.log('error du validate joi '+ error);
}else{
    console.log(value);
}

