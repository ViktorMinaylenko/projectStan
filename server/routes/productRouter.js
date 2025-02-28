const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')


router.post('/', productController.create)
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Отримати список продуктів
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: brandId
 *         schema:
 *           type: integer
 *         description: ID бренду для фільтрації
 *       - in: query
 *         name: typeId
 *         schema:
 *           type: integer
 *         description: ID типу для фільтрації
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Кількість продуктів на сторінці
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер сторінки
 *     responses:
 *       200:
 *         description: Список продуктів
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Помилка сервера
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Футболка"
 *         price:
 *           type: number
 *           format: float
 *           example: 499.99
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         image_url:
 *           type: string
 *           example: "image.jpg"
 *         brandId:
 *           type: integer
 *           example: 1
 *         typeId:
 *           type: integer
 *           example: 2
 */
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

module.exports = router
