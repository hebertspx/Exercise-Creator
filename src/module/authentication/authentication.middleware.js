const { check } = require("express-validator");

function validatorRequestResetPass() {
    return [
        check('email')
            .notEmpty()
            .withMessage('Email cannot be empty')
            .isEmail()
            .withMessage('Invalid email'),
    ]
}

function resetPasswordValidator() {
    return [
        check('password')
            .notEmpty()
            .withMessage('Password cannot be empty')
            .isLength(8)
            .withMessage('Password need 8 or more characters')
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
            .withMessage('Password needs to be stronger'),
        check('confirm_password')
            .notEmpty()
            .withMessage('Password cannot be empty')
            .isLength(8)
            .withMessage('Password need 8 or more characters')
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
            .withMessage('Password needs to be stronger')
            .custom(function (value, { req }) {
                if (value === req.body.password) {
                    return true
                }
                throw new Error('Passwords must be the same')
            })
    ]
}

module.exports = {
    validatorRequestResetPass,
    resetPasswordValidator
}