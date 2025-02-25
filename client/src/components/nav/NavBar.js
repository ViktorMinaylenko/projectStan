import React, { useContext, useState } from 'react'
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap'
import { Context } from '../..'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi'
import './NavBar.css'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate()
	const [expanded, setExpanded] = useState(false)

	const logOut = () => {
		console.log('Користувач вийшов з системи:', user.user.email)
		localStorage.removeItem('token')
		user.setUser({})
		user.setIsAuth(false)
		navigate(SHOP_ROUTE)
	}

	return (
		<Navbar
			expand='lg'
			className='navbar-custom'
			expanded={expanded}
			onToggle={() => setExpanded(!expanded)}
		>
			{/* Логотип */}
			<Navbar.Brand as={NavLink} to='/' className='navbar-brand'>
				GYMSHARK
			</Navbar.Brand>

			{/* Кнопка для мобільного меню */}
			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				{/* Основні посилання (центровані) */}
				<Nav className='mx-auto'>
					<Nav.Link as={NavLink} to='/women' className='nav-link-custom'>
						WOMEN
					</Nav.Link>
					<Nav.Link as={NavLink} to='/men' className='nav-link-custom'>
						MEN
					</Nav.Link>
					<Nav.Link as={NavLink} to='/accessories' className='nav-link-custom'>
						ACCESSORIES
					</Nav.Link>
				</Nav>

				{/* Пошук та іконки (праворуч) */}
				<Nav className='ms-auto d-flex align-items-center'>
					{/* Пошук */}
					<div className='search-wrapper me-3'>
						<div className='input-group search-container'>
							<input
								type='text'
								className='form-control search-input'
								placeholder='What are you looking for...'
							/>
							<Button variant='outline-secondary' className='search-button'>
								<FiSearch className='search-icon' />
							</Button>
						</div>
					</div>

					{/* Кошик */}
					<FiShoppingBag
						className='nav-icon me-3'
						onClick={() => navigate('/cart')}
					/>

					{/* Профіль/авторизація */}
					{user.isAuth ? (
						<Dropdown align='end'>
							<Dropdown.Toggle
								variant='light'
								id='dropdown-basic'
								className='nav-icon'
							>
								<FiUser />
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={() => navigate('/admin')}>
									Адмін панель
								</Dropdown.Item>
								<Dropdown.Item onClick={logOut}>Вийти</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						<FiUser className='nav-icon' onClick={() => navigate('/login')} />
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
})

export default NavBar
