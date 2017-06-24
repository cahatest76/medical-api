'use strict';

module.exports = function (Person) {

    Person.computeFullName = function computeFullName(person) {
        return person.name + ' ' + person.lname;
    };

    Person.observe('before save', function removeUnwantedFields(ctx, next) {
        if (ctx.instance) {
            ctx.instance.unsetAttribute('fullName');
        } else {
            delete ctx.data.fullName;
        }
        next();
    });

};
