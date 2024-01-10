const { MAILUSER } = require('../../config/env')
const { sendEmailResetPass, baseEmail, mailOptions } = require('../../untils/sendEmail')
const { findByEmail } = require('../users/users.repository')
const userService = require('../users/users.service')

async function requestResetPassword({ email }) {
    console.log('email', email)
    const checkEmailInDb = await userService.findByEmail({ email })
    console.log('service', checkEmailInDb)
    const shippingDetails = mailOptions(MAILUSER, email)
    const mailReset = sendEmailResetPass(shippingDetails)
    return mailReset

}

module.exports = {
    findByEmail,
    requestResetPassword
}