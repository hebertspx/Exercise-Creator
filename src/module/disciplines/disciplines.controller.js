const express = require('express')
const disciplineRouter = express.Router();
const disciplineService = require('../disciplines/disciplines.service')
const { authorizationUser } = require('../users/users.middleware');
const { validatorController } = require('../../untils/validator.middleware');
const { disciplineValidationRules, paramsValidationRules } = require('./disciplines.middleware');


disciplineRouter.get('/', authorizationUser, paramsValidationRules(), validatorController, async function (req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await disciplineService.listPagineted({ page, limit });

        res.send({ data: result.disciplines, pagination: { page: Number(page), pageSize: Number(limit), count: Number(result.count) } })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
})

disciplineRouter.get('/:id', authorizationUser, async function (req, res) {
    try {
        const responseService = await disciplineService.listById(Number(req.params.id))
        res.send({ data: responseService })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Request error" })
    }
})

disciplineRouter.post('/', authorizationUser, disciplineValidationRules(), validatorController, async function (req, res) {
    try {
        const discipline = await disciplineService.create(req.body)
        res.send({ data: discipline })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Error when trying to add discipline" });
    }
})

disciplineRouter.put('/:id', authorizationUser, disciplineValidationRules(), validatorController, async function (req, res) {
    try {
        const idService = Number(req.params.id)
        const newDiscipline = await disciplineService.update(idService, req.body)
        res.send({ data: newDiscipline })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Error when trying to update discipline" });
    }
})

disciplineRouter.delete('/:id', authorizationUser, async function (req, res) {
    try {
        const idService = Number(req.params.id)
        const responseService = await disciplineService.remove(idService)
        res.send({ data: responseService })
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: "Error when trying to delete discipline" })
    }

})



module.exports = {
    disciplineRouter
}