const { connectionKnex } = require("../../config/dataBaseWithKnex");

async function count(ctx) {
    const rows = await connectionKnex('disciplines').transacting(ctx).count()
    return rows
}

async function listAll({ page = 1, limit = 10 }, ctx) {
    const rows = await connectionKnex('disciplines').transacting(ctx).select('*').limit(limit).offset(((page - 1) * limit)).orderBy('id', 'asc')
    return rows
}

async function listPagineted({ page = 1, limit = 10 }) {

    const result = await connectionKnex.transaction(async function (ctx) {
        const countResult = await count(ctx);
        const listAllResult = await listAll({ page, limit }, ctx);

        return {
            disciplines: listAllResult,
            count: countResult[0].count
        };
    });
    return result
}

async function listById(id) {
    const rows = await connectionKnex('disciplines').select('id', 'discipline').from('disciplines').where('id', id).returning('id')
    if (rows[0]) {
        return rows[0]
    }
    throw new Error('This discipline does not exist')
}

async function findByName(discipline) {
    const rows = await connectionKnex('disciplines').select('discipline').from('disciplines').where('discipline', discipline)
    return rows[0]
}

async function create({ discipline }) {
    const rows = await connectionKnex('disciplines').insert({ discipline }).returning('id')
    return { id: rows[0].id, discipline }
}

async function update(id, discipline) {
    const rows = await connectionKnex('disciplines').where('id', id).update(discipline, ['discipline']).returning('id')

    return { id: rows[0].id, discipline }
}

async function deleteById(id) {
    const rows = await connectionKnex('disciplines').where({ id }).del()
    return rows[id]
}


module.exports = {
    findByName,
    create,
    listAll,
    listById,
    update,
    count,
    listPagineted,
    deleteById
}