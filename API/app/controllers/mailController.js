const { MailModel } = require('../models');
const { joiSchema }  = require('../services');



const mailController ={
    sendMailToRide : async (request , response) => {
        try {
            request.body.ride_id = parseInt(request.params.idRide,10);
            request.body.member_id = request.userId;
            const value = await joiSchema.schemaMessage.validateAsync(request.body,{escapeHtml: true});
                
            const mail = new MailModel(value);
            const data = await mail.save(mail);
            
            response.status(201).json({message:data.message});
        } catch (error) {
            response.status(500).json(error.message);
            
        }

    },
};

module.exports = mailController;