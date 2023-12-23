const bcrypt = require('bcryptjs')


function comparePassword(newPassword, hashPassword) {
    return bcrypt.compare(newPassword, hashPassword)
}

module.exports = {
    comparePassword
}