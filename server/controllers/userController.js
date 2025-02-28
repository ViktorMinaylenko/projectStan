require('dotenv').config()
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Cart} = require('../models/models')

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
}

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Некоректний email або password'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(ApiError.badRequest('Користувач з таким email існує'))
		}
		const hasPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, password: hasPassword })
		const cart = await Cart.create({ userId: user.id })
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({ token })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.internal('Користувача з таким email не знайдено'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Введенно невірний пароль'))
		}
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({ token })
	}

	async check(req, res, next) {
		const user = await User.findOne({ where: { id: req.user.id } })
		if (!user) {
			return next(ApiError.unauthorized('Користувача не знайдено'))
		}
		const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({ token })
	}

	async deleteAccount(req, res, next) {
		try {
			const { id } = req.user

			const user = await User.findOne({ where: { id } })
			if (!user) {
				return next(ApiError.notFound('Користувача не знайдено'))
			}

			await User.destroy({ where: { id } })

			await Cart.destroy({ where: { userId: id } })

			return res.json({ message: 'Обліковий запис успішно видалено' })
		} catch (e) {
			return next(
				ApiError.internal(
					'Помилка при видаленні облікового запису: ' + e.message
				)
			)
		}
	}

	async export(req, res, next) {
		try {
			const { id } = req.user
			const user = await User.findOne({ where: { id } })
			if (!user) {
				return next(ApiError.notFound('Користувача не знайдено'))
			}

			return res.json(user)
		} catch (e) {
			return next(ApiError.internal('Помилка при експорті даних: ' + e.message))
		}
	}
}

module.exports = new UserController()
