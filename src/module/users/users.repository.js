const { connectionKnex } = require('../../config/dataBaseWithKnex');


async function findByEmail(email) {
    const rows = await connectionKnex('users').select('email').from('users').where('email', email)
    return rows[0]
}

async function create({ name, email, password }) {
    const rows = await connectionKnex('users').insert({ name, email, password }).returning('id')
    return { id: rows[0].id, name, email }
}

module.exports = {
    create,
    findByEmail
}