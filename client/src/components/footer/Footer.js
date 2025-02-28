import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
	return (
		<footer className='footer'>
			<Container>
				<Row>
					{/* Секція "Про нас" */}
					<Col md={4} className='mb-3'>
						<h5>Про нас</h5>
						<p className='text-muted'>
							GYMSHARK - інтернет-магазин спортивного одягу та аксесуарів.
						</p>
					</Col>

					{/* Секція "Корисні посилання" */}
					<Col md={4} className='mb-3'>
						<h5>Корисні посилання</h5>
						<ul className='footer-links'>
							<li>
								<NavLink to='/privacy-policy'>
									Політика конфіденційності
								</NavLink>
							</li>
							<li>
								<NavLink to='/terms'>Умови використання</NavLink>
							</li>
							<li>
								<NavLink to='/contacts'>Контакти</NavLink>
							</li>
						</ul>
					</Col>

					{/* Секція "Контакти" */}
					<Col md={4} className='mb-3'>
						<h5>Контакти</h5>
						<p className='text-muted'>Email: support@gymshark.com</p>
						<p className='text-muted'>Телефон: +380 965 908 262</p>
					</Col>
				</Row>

				{/* Копірайт */}
				<Row>
					<Col className='text-center py-3'>
						<p className='text-muted mb-0'>
							© {new Date().getFullYear()} GYMSHARK. Всі права захищені.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
