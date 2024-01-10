const express = require('express')
const authRouter = express.Router()
const authService = require('../authentication/authentication.service')

authRouter.post('/request-reset-password', async function (req, res) {
    try {
        const reqEmail = req.body
        const reqReset = await authService.requestResetPassword(reqEmail)
        console.log('controler', req.body)
        res.send({ data: reqReset })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
})


module.exports = {
    authRouter
}