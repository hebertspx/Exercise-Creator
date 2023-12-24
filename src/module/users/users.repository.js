const { connectionKnex } = require('../../config/dataBaseWithKnex');

async function listAll() {
    const rows = await connectionKnex('users').select('*')
    return rows
}

async function findByEmail(email) {
    const rows = await connectionKnex('users').select('email').from('users').where('email', email)
    return rows[0]
}

async function create({ name, email, password }) {
    const rows = await connectionKnex('users').insert({ name, email, password }).returning('id')
    return { id: rows[0].id, name, email }
}

async function signIn({ email }) {
    const rows = await connectionKnex('users').select().from('users').where({ email }).debug()
    console.log('rows', rows)
    if (rows.length) {
        return rows[0]
    }
    return null
}

module.exports = {
    create,
    findByEmail,
    signIn,
    listAll
}