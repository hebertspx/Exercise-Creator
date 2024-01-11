const { mailConnection } = require("../../config/nodemailer")


async function sendMail({to, subject, text}){    
    const response = await mailConnection.sendMail({to, subject, text})
    return response
}

module.exports = {
    sendMail
}