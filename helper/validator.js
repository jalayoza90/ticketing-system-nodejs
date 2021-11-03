const validator = require('validator');
const isEmpty = require('is-empty');

module.exports.checkUserValidation = (data) => {
    const errors = {};
    data.email = !(isEmpty(data.email)) ? data.email : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';

    if (validator.isEmpty(data.email)) {
        errors.email = messages.emailRequired;
    }
    if (validator.isEmpty(data.password)) {
        errors.email = messages.passwordRequired;
    }
    if (!validator.isEmail(data.email)) {
        errors.email = messages.invalidEmail;
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}