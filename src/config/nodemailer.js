var nodemailer = require('nodemailer')
const { MAILSERVICE, MAILUSER, MAILPASS } = require('./env.js')

const mailConnection = nodemailer.createTransport({
    service: MAILSERVICE,
    port: 587,
    secure: true,
    auth: {
        user: MAILUSER,
        pass: MAILPASS
    }
})

module.exports = {
    mailConnection
}
