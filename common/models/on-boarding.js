'use strict';
var app = require('../../server/server');

module.exports = function (Onboarding) {

    Onboarding.observe('before save', function filterProperties(ctx, next) {
        let onBoarding = ctx.instance;
        let Account = app.models.Account;
        let Patient = app.models.Patient;

        let contactInfoEmail = onBoarding.contactInfos.filter(function (contactInfo) {
            return contactInfo.contactInfoType == 'Email'
        });

        //ToDo validar 
            //email que exista o regresar y que sea correcto
            //que el onboarding type sea correcto
            //validar contact info types
        //Todo hacer transaccional con messages
        //todo manejo de error

        Account.create({
            accountType: onBoarding.onBoardingType,
            email: contactInfoEmail[0].value,
            password: onBoarding.password
        }, function (err, account) {

            Patient.create({
                onBoardingType: onBoarding.onBoardingType,
                name: onBoarding.name,
                lname: onBoarding.lname,
                gender: onBoarding.gender,
                birthdate: onBoarding.birthdate,
                contactInfos: onBoarding.contactInfos,
                accountId: account.id
            }, function (err, Patient){
                onBoarding.patientId = Patient.id;
                //Onboarding.upsert(onBoarding);
                next();
            });

        });
    });


};
