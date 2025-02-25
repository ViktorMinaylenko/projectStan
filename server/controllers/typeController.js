const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
	async create(req, res, next) {
		const { name } = req.body

		if (!name || name.trim() === '') {
			return next(
				ApiError.badRequest('Type name is required and cannot be empty.')
			)
		}

		try {
			const type = await Type.create({ name })
			return res.json(type)
		} catch (error) {
			return next(
				ApiError.internal('An error occurred while creating the type.')
			)
		}
	}

	async getAll(req, res) {
		const types = await Type.findAll()
		return res.json(types)
	}
}

module.exports = new TypeController()
