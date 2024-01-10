const communicator = require("../config/configEmailResponses")

function mailOptions(from, to, subject, text) {
    return {
        from: from,
        to: to,
        subject: subject || 'Default Subject',
        text: text || 'Default Messege'
    }
}

function sendEmailResetPass(dataEmail) {
    return communicator.sendMail(dataEmail)
}


module.exports = {
    sendEmailResetPass,
    mailOptions
}