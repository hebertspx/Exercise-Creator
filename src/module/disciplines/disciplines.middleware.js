const { check } = require("express-validator");

function disciplineValidationRules() {
    return [
        check('discipline')
            .isLength(4)
            .withMessage('This name discipline is short')
            .notEmpty()
            .withMessage('Discipline cannot be empty'),
    ]
}

function paramsValidationRules() {
    return [
        check('page')
            .isNumeric()
            .withMessage('This parameter must be numeric')
            .optional(),
        check('limit')
            .isNumeric()
            .withMessage('This parameter must be numeric')
            .optional(),
    ]
}

module.exports = {
    disciplineValidationRules,
    paramsValidationRules
}