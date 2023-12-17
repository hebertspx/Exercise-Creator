const express = require('express')
const userRouter = express.Router();
const userService = require('../users/users.service');
const { userValidationRules } = require('./users.middleware');
const { validatorController } = require('../../untils/validator.middleware');




userRouter.post('/', userValidationRules(), validatorController, async function (req, res) {
    try {
        const user = await userService.create(req.body)
        res.send({ data: user })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Error when trying to create user" });
    }
})

module.exports = {
    userRouter
}