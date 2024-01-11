const express = require('express')
const authRouter = express.Router()
const authService = require('../authentication/authentication.service')
const { validatorRequestResetPass, resetPasswordValidator } = require('./authentication.middleware')
const { validatorController } = require('../../untils/validator.middleware')



authRouter.post('/request-reset-password', validatorRequestResetPass(), validatorController, async function (req, res) {
    try {
        const reqReset = await authService.requestResetPassword(req.body)
        res.send({ data: reqReset })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
})

authRouter.post('/reset-password', resetPasswordValidator(), validatorController, async function (req, res) {
    try {
        const resetPass = await authService.resetPassword(req.body)
        res.send({ data: resetPass })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
});



module.exports = {
    authRouter
}