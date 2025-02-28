import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

/**
 * Реєстрація користувача.
 * Відправляє email та пароль на сервер для створення нового акаунта.
 * Сервер повертає токен, який зберігається в localStorage та розшифровується.
 * @param {string} email - Email користувача
 * @param {string} password - Пароль користувача
 * @returns {object} - Декодований токен користувача
 */
export const registration = async (email, password) => {
	const { data } = await $host.post('api/user/registration', {
		email,
		password,
		role: 'USER',
	})
	localStorage.setItem('token', data.token) // Зберігаємо токен у localStorage
	return jwtDecode(data.token) // Декодуємо та повертаємо токен
}

/**
 * Авторизація користувача.
 * Відправляє email і пароль на сервер. Якщо успішно, сервер повертає токен.
 * @param {string} email - Email користувача
 * @param {string} password - Пароль користувача
 * @returns {object} - Декодований токен користувача
 */
export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password })
	localStorage.setItem('token', data.token) // Зберігаємо токен у localStorage
	return jwtDecode(data.token) // Декодуємо та повертаємо токен
}

/**
 * Перевірка авторизації.
 * Надсилає запит до сервера для перевірки, чи дійсний токен.
 * Якщо токен ще актуальний, оновлює його в localStorage.
 * Якщо ні, видаляє токен та викидає помилку.
 * @returns {object} - Декодований токен користувача або помилка
 */
export const check = async () => {
	try {
		const { data } = await $authHost.get('api/user/auth') // Запит на перевірку токена
		localStorage.setItem('token', data.token) // Оновлюємо токен
		return jwtDecode(data.token) // Декодуємо та повертаємо токен
	} catch (e) {
		localStorage.removeItem('token') // Якщо токен недійсний, видаляємо його
		throw e // Викидаємо помилку для обробки
	}
}

/**
 * Видалення акаунта користувача.
 * Надсилає запит на сервер для видалення акаунта.
 * @returns {object} - Відповідь сервера
 */
export const deleteAccount = async () => {
	const response = await $authHost.delete('/api/user/delete')
	return response.data
}

/**
 * Експорт даних користувача.
 * Отримує експортовані дані користувача із сервера.
 * @returns {object} - Дані користувача у форматі, який визначає сервер
 */
export const exportData = async () => {
	const response = await $authHost.get('/api/user/export')
	return response.data
}
