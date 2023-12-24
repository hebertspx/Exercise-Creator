const { hashPassword } = require('../../untils/hashPassword')
const usersRepository = require('../users/users.repository')
const { jwtSignIn } = require('../../untils/jwt.service')
const { comparePassword } = require('../../untils/comparePassword')

async function listAll() {
    const users = await usersRepository.listAll()
    return users
}

async function findByEmail(email) {
    const existentEmail = await usersRepository.findByEmail(email)
    if (existentEmail) {
        return existentEmail
    }

}

async function create({ name, email, password }) {

    const checkEmailDb = await findByEmail(email)
    if (checkEmailDb) {
        throw new Error('This user is already registered')
    }

    const hashPass = await hashPassword(password, 10)
    const userCreate = await usersRepository.create({ name, email, password: hashPass })
    return userCreate
}

async function signIn({ email, password }) {
    const signInService = await usersRepository.signIn({ email })
    if (signInService) {
        const comparePass = await comparePassword(password, signInService.password);
        if (comparePass) {
            delete signInService.password
            const token = jwtSignIn(signInService) // 
            return { access_token: token, data: signInService }
        }
        throw new Error('User or password invalid')
    }
    throw new Error('User or password invalid')
}

module.exports = {
    create,
    findByEmail,
    signIn,
    listAll
}