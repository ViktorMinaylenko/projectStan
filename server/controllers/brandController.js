const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
	async create(req, res, next) {
		const { name } = req.body

		if (!name || name.trim() === '') {
			return next(
				ApiError.badRequest('Brand name is required and cannot be empty.')
			)
		}

		try {
			const brand = await Brand.create({ name })
			return res.json(brand)
		} catch (error) {
			return next(
				ApiError.internal('An error occurred while creating the brand.')
			)
		}
	}

	async getAll(req, res) {
		const brands = await Brand.findAll()
		return res.json(brands)
	}
}

module.exports = new BrandController()
