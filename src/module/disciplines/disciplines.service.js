const disciplinesRepository = require('../disciplines/disciplines.repository')

async function count() {
    const dataCount = await disciplinesRepository.count()
    return dataCount
}

async function listAll({ page, limit }) {
    const allDisciplines = await disciplinesRepository.listAll({ page, limit })
    return allDisciplines
}

async function listPagineted({ page, limit }, ctx) {
    const disciplines = await disciplinesRepository.listPagineted({ page, limit }, ctx)
    return disciplines
}

async function listById(id) {
    const discipline = await disciplinesRepository.listById(id)
    if (id === discipline.id) {
        return discipline
    }
    return null
}

async function findByName(discipline) {
    const existentDiscipline = await disciplinesRepository.findByName(discipline)
    if (existentDiscipline) {
        return existentDiscipline
    }
}

async function create({ discipline }) {
    const checkDbDiscipline = await findByName(discipline)
    if (checkDbDiscipline) {
        throw new Error('This discipline already exists')
    }

    const disciplineCreate = disciplinesRepository.create({ discipline })
    return disciplineCreate
}

async function update(id, discipine) {
    const oldDiscipline = await disciplinesRepository.listById(id)
    if (oldDiscipline) {
        const newDiscipline = await disciplinesRepository.update(id, discipine)
        return newDiscipline
    }
    throw new Error('This discipline is not registered.')
}

async function remove(id) {
    const dataDelete = await disciplinesRepository.deleteById(id)
    return dataDelete
}




module.exports = {
    findByName,
    create,
    listAll,
    listById,
    update,
    listPagineted,
    remove,
    count
}