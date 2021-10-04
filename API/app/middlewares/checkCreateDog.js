
module.exports = (request, response, next) => {
    try {
        console.log(request.body);
        const errorMessage = [];
        if (!request.body.surname) {
            errorMessage.push("Le nom du chien est obligatoire");
        }
        if (request.body.surname && request.body.surname.length > 20) {
            errorMessage.push("Le nom du chien ne doit pas dépasser 20 caractères");
        }

        if (request.body.breed_id && isNaN(Number(request.body.breed_id))) {
            errorMessage.push("L'id de la race doit être  un nombre");
        }

        if (!request.body.gender_id) {
            errorMessage.push("Le sexe du chien est obligatoire");
        }
        if (request.body.gender_id && isNaN(Number(request.body.gender_id))) {
            errorMessage.push("L'id du sexe doit être un nombre");
        }

        if (!request.body.dog_owner_id) {
            errorMessage.push("Le maître du chien est obligatoire");
        }
        if (request.body.dog_owner_id && isNaN(Number(request.body.dog_owner_id))) {
            errorMessage.push("L'id du maître du chien doit être un nombre");
        }

        if (!request.body.behavior_id) {
            errorMessage.push("Le comportement du chien est obligatoire");
        }
        if (request.body.behavior_id && isNaN(Number(request.body.behavior_id))) {
            errorMessage.push("L'id du comportement doit être un nombre");
        }

        if (!request.body.birthday) {
            errorMessage.push("La date de naissance du chien est obligatoire");
        }
        //todo regex

        if (!request.body.sterilization) {
            errorMessage.push(
                "L'information concernant la stérilization du chien est obligatoire"
            );
        }
        if (
            request.body.sterilization &&
            !request.body.sterilization === "true" &&
            !request.body.sterilization === "false"
        ) {
            errorMessage.push("La stérilization doit être un booléan");
        }

        if (request.body.description && request.body.description.length > 200) {
            errorMessage.push(
                "La description du chien ne doit pas dépasser 200 caractères"
            );
        }

        //todo ne fonctionne pas
        // const regexDate = new RegExp('([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))');
        //    const regexDate = new RegExp('/[12]\d{3}*');
        //     console.log("req", request.body.birthday);
        //     console.log("regex", regexDate.test(request.body.birthday));
        //     if(request.body.birthday && !regexDate.test(request.body.birthday)) {
        //         errorMessage.push('La date de naissance du chien n\'est pas au bon format');
        //     }

        //todo weight

        if (errorMessage.length !== 0) {
            response.status(400).json(errorMessage);
        } else {
            next();
        }

    } catch (error) {
        response.status(500).json(error);
    }
};
