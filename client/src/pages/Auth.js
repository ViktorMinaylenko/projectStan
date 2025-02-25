import React, { useContext, useState } from 'react'
import { Container, Card, Form, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let data
			if (isLogin) {
				console.log('Спроба входу в систему з email:', email)
				data = await login(email, password)
				console.log('Успішний вхід в систему:', data)
			} else {
				console.log('Спроба реєстрації з email:', email)
				data = await registration(email, password)
				console.log('Успішна реєстрація:', data)
			}
			user.setUser(data)
			user.setIsAuth(true)
			console.log('Користувач авторизований:', user.isAuth)
			navigate(SHOP_ROUTE)
		} catch (e) {
			console.error('Помилка при вході/реєстрації:', e.response.data.message)
			alert(e.response.data.message)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизацsя' : 'Реєстрація'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш email...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введіть ваш пароль...'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
					/>
					<Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
						{isLogin ? (
							<div>
								Немає аккаунту?{' '}
								<NavLink to={REGISTRATION_ROUTE}>Зареєструватися</NavLink>
							</div>
						) : (
							<div>
								Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійти</NavLink>
							</div>
						)}
						<Button variant={'outline-success'} onClick={click}>
							{isLogin ? 'Увійти' : 'Зареєструватися'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
