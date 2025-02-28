const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         role:
 *           type: string
 *           example: USER
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2023-10-05T14:48:00.000Z'
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: '2023-10-05T14:48:00.000Z'
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *               role:
 *                 type: string
 *                 example: USER
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Користувач успішно зареєстрований
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Некоректні дані або користувач вже існує
 */
router.post('/registration', userController.registration)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Увійти до системи
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Успішний вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Невірний email або пароль
 */
router.post('/login', userController.login)

/**
 * @swagger
 * /user/auth:
 *   get:
 *     summary: Перевірити автентифікацію користувача
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Користувач авторизований
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Неавторизований користувач
 */
router.get('/auth', authMiddleware, userController.check)

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Видалити обліковий запис користувача
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Обліковий запис успішно видалено
 *       401:
 *         description: Неавторизований користувач
 */
router.delete('/delete', authMiddleware, userController.deleteAccount)

/**
 * @swagger
 * /user/export:
 *   get:
 *     summary: Експорт даних користувача
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Дані користувача експортовано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Неавторизований користувач
 */
router.get('/export', authMiddleware, userController.export)

module.exports = router

/**
 * @swagger
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
