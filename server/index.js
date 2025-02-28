require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

// Swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

// Swagger конфігурація
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Vintage Shop API',
			version: '1.0.0',
			description: 'API для роботи з товарами у вінтажному магазині',
		},
	},
	apis: ['./routes/*.js'], // Вказуємо шлях до файлів з API
}

// Підключення Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api', router)
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
