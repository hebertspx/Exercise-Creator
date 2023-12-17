const { hashPassword } = require('../../untils/hashPassword')
const usersRepository = require('../users/users.repository')


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

module.exports = {
    create,
    findByEmail
}