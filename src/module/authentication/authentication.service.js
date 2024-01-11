const { BASE_URL_FRONT, RESETPASS_SECRET_KEY } = require('../../config/env')
const { jwtResetPassword } = require('../../untils/jwt.service')
const { sendMail } = require('../mail/mail.service')
const { findByEmail } = require('../users/users.repository')
const userService = require('../users/users.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function requestResetPassword({ email }) {
    const foundUserByEmail = await userService.findByEmail({ email })
    const token = jwtResetPassword(foundUserByEmail)
    await sendMail({
        to: email,
        subject: "Recovery Password",
        text: `Hi ${foundUserByEmail.name}, you can recovery you password accessing this link: ${BASE_URL_FRONT}/recover-password/${token}`
    })
    return { access_token: token, user: email }
}


async function resetPassword({ email, password, confirm_password }) {

    requestResetPassword({ email })
    console.log('auth service ', requestResetPassword(email))
    if (password === confirm_password) {
        const decodedToken = jwt.verify(token, RESETPASS_SECRET_KEY);
        const hashedPassword = await bcrypt.hash(password, 10);
    }

}


module.exports = {
    findByEmail,
    requestResetPassword,
    resetPassword

}