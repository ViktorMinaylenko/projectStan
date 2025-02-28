const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')


/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Створити новий бренд
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Назва бренду
 *                 example: "Nike"
 *     responses:
 *       200:
 *         description: Бренд успішно створено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nike"
 *       400:
 *         description: Неправильний запит (наприклад, відсутнє ім'я бренду)
 *       500:
 *         description: Помилка сервера
 */
router.post('/', brandController.create)
router.get('/', brandController.getAll)

module.exports = router
