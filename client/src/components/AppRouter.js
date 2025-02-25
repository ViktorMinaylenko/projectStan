import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '..'

const AppRouter = () => {
	const { user } = useContext(Context)

	console.log('Поточний користувач:', user.user)
	console.log('Користувач авторизований:', user.isAuth)
	console.log('Роль користувача:', user.user.role)

	return (
		<Routes>
			{user.isAuth &&
				user.user.role === 'ADMIN' &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
		</Routes>
	)
}

export default AppRouter
