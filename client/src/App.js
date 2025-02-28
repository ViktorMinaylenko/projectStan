import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import CookieConsent from 'react-cookie-consent'
import 'bootstrap/dist/css/bootstrap.min.css'


/**
 * Головний компонент додатку.
 * Відповідає за відображення основних елементів UI:
 * - навігаційного меню (NavBar)
 * - маршрутизації сторінок (AppRouter)
 * - підвалу сайту (Footer)
 * - обробки авторизації користувача
 * - управління cookie-згодою
 */
const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true) // Стан завантаження при перевірці авторизації
	const [cookieAccepted, setCookieAccepted] = useState(() => {
		const storedConsent = localStorage.getItem('cookieConsent')
		return storedConsent === 'true'
	})

	// Виконується один раз при завантаженні сторінки
	useEffect(() => {
		check()
			.then(data => {
				user.setUser(data) // Встановлюємо дані користувача
				user.setIsAuth(true) // Позначаємо, що користувач авторизований
			})
			.catch(() => {
				localStorage.removeItem('token') // Якщо помилка, видаляємо токен
				user.setUser({}) // Скидаємо дані користувача
				user.setIsAuth(false) // Позначаємо, що користувач не авторизований
			})
			.finally(() => setLoading(false)) // Завершуємо завантаження
	}, [])

	// Функція для прийняття cookies
	const handleAcceptCookies = () => {
		localStorage.setItem('cookieConsent', 'true')
		setCookieAccepted(true)
	}

	// Функція для відхилення cookies
	const handleDeclineCookies = () => {
		localStorage.setItem('cookieConsent', 'false')
		document.cookie =
			'cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		setCookieAccepted(false)
	}

	// Якщо додаток ще завантажується – показуємо спінер
	if (loading) {
		return <Spinner animation={'grow'} />
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />

			{/* Спливаюче вікно для згоди з використанням cookies */}
			{!cookieAccepted && (
				<CookieConsent
					location='bottom'
					buttonText='Прийняти'
					declineButtonText='Відмовитись'
					enableDeclineButton
					onAccept={handleAcceptCookies}
					onDecline={handleDeclineCookies}
					cookieName='cookieConsent'
					expires={365}
					style={{ background: '#000', color: '#fff' }}
					buttonStyle={{
						background: '#fff',
						color: '#000',
						fontSize: '14px',
						border: '1px solid #fff',
					}}
					declineButtonStyle={{
						background: 'transparent',
						color: '#fff',
						fontSize: '14px',
						border: '1px solid #fff',
					}}
				>
					Ми використовуємо cookies для покращення досвіду на сайті.{' '}
					<a
						href='/privacy-policy'
						style={{ color: '#fff', textDecoration: 'underline' }}
					>
						Дізнатися більше
					</a>
				</CookieConsent>
			)}

			<Footer />
		</BrowserRouter>
	)
})

export default App
