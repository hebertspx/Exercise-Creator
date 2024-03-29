const { check } = require("express-validator")
const { jwtVerify } = require('../../untils/jwt.service')

function authorizationUser(req, res, next) {
    try {
        const bearerToken = req.headers.authorization
        const [bearer, token] = bearerToken.split(" ")

        if (bearer === "Bearer" && token) {
            const user = jwtVerify(token)
            req.user = user
            return next()
        }
        return res.status(401).json({ error: "Unauthorized user" })
    } catch (error) {
        console.log("Error", error)
        return res.status(401).json({ error: "Unauthorized user" })
    }
}


function userValidationRules() {
    return [
        check('name')
            .isLength(4)
            .withMessage('This name is short')
            .notEmpty()
            .withMessage('Name cannot be empty'),
        check('email')
            .notEmpty()
            .withMessage('Email cannot be empty')
            .isEmail()
            .withMessage('Invalid Email'),
        check('password')
            .notEmpty()
            .withMessage('Password cannot be empty')
            .isLength(8)
            .withMessage('Password need 8 or more characters')
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
            .withMessage('Password needs to be stronger'),
        check('repeat_password')
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

function signInValidationRules() {
    return [
        check('email')
            .notEmpty()
            .withMessage('Email cannot be empty')
            .isEmail()
            .withMessage('Invalid Email'),
        check('password')
            .notEmpty()
            .withMessage('Passoword cannot be empty')
            .isLength(8)
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 })
            .withMessage('Password needs to be stronger')
    ]
}


module.exports = {
    userValidationRules,
    authorizationUser,
    signInValidationRules
}