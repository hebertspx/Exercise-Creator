const { hashPassword } = require('../../untils/hashPassword')
const usersRepository = require('../users/users.repository')
const { jwtSignIn } = require('../../untils/jwt.service')
const { comparePassword } = require('../../untils/comparePassword')
const { compareObjectsToUpdate } = require('../../untils/compareObjectsToUpdate')

async function listAll() {
    const users = await usersRepository.listAll()
    return users
}

async function findOne(id) {
    const userById = await usersRepository.findOne(id)
    if (userById) {
        return userById
    }
    throw new Error("User not found")
}

async function findByEmail({ email }) {
    const existentEmail = await usersRepository.findByEmail({ email })
    if (existentEmail) {
        return existentEmail
    }
    throw new Error('This email is not registered')

}

async function create({ name, email, password }) {

    const foundUser = await usersRepository.findByEmail({ email })
    if (foundUser) {
        throw new Error('User already exists')
    }
    const hashPass = await hashPassword(password, 10)
    const userCreate = await usersRepository.create({ name, email, password: hashPass })
    return userCreate
}

async function update({ id, item }) {
    //delete item.password
    const previousUser = await findOne({ id })
    console.log('user servic', previousUser)
    const newUser = compareObjectsToUpdate(previousUser.id, item)
    const userUpdate = await usersRepository.update(newUser)
    return userUpdate
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
    listAll,
    update
}