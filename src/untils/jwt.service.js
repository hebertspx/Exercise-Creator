const jwt = require("jsonwebtoken")
const env = require("../config/env")
const { SECRET_KEY } = require("../../src/config/env")

function jwtSignIn(user) {
    return jwt.sign(user, env.SECRET_KEY, { expiresIn: '1h' })
}

function jwtVerify(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    jwtSignIn,
    jwtVerify
}