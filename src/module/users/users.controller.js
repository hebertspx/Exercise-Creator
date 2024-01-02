const express = require('express')
const userRouter = express.Router();
const userService = require('../users/users.service');
const { userValidationRules, authorizationUser, signInValidationRules } = require('./users.middleware');
const { validatorController } = require('../../untils/validator.middleware');

userRouter.get('/', authorizationUser, async function (req, res) {
    try {
        const responseService = await userService.listAll()
        res.send({ data: responseService })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
})


userRouter.post('/', userValidationRules(), validatorController, async function (req, res) {
    try {
        const user = await userService.create(req.body)
        res.send({ data: user })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Error when trying to create user" });
    }
})

userRouter.post('/signIn', signInValidationRules(), validatorController, async function (req, res) {
    try {

        const responseService = await userService.signIn(req.body)

        res.send({ data: responseService })
    } catch (error) {
        console.log('Error', error)
        res.status(401).json({ error: 'User or password invalid' })
    }
})

module.exports = {
    userRouter,
}