const bcrypt = require('bcryptjs')


function hashPassword(password, value) {
    const newPass = bcrypt.hash(password, value)
    return newPass
}

module.exports = {
    hashPassword
}