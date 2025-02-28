import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/productAPI'

/**
 * Компонент сторінки товару.
 * Підвантажує дані товару за ID, відображає зображення, назву, рейтинг, ціну та опис товару.
 *
 * @component
 */
const ProductPage = () => {
	/**
	 * Стан з даними товару.
	 * @type {Object}
	 * @property {Array} info - Додаткова інформація про товар.
	 */
	const [product, setProduct] = useState({ info: [] })

	// Отримання параметра "id" з URL для підвантаження конкретного товару.
	const { id } = useParams()

	/**
	 * useEffect виконується при першому рендері компонента.
	 * Викликає API для отримання даних товару за ID та зберігає їх у стані.
	 */
	useEffect(() => {
		fetchOneProduct(id).then(data => setProduct(data))
	}, [id])

	return (
		<Container className='mt-3'>
			<Row>
				{/* Стовпець для відображення зображення товару */}
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + product.image_url}
						alt={product.name}
					/>
				</Col>

				{/* Стовпець для відображення назви товару та рейтингу */}
				<Col md={4}>
					<Row className='d-flex flex-column align-items-center'>
						<h2>{product.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								background: `url(${bigStar}) no-repeat center center`,
								width: 240,
								height: 240,
								backgroundSize: 'cover',
								fontSize: 64,
							}}
						>
							{product.rating}
						</div>
					</Row>
				</Col>

				{/* Стовпець для відображення ціни та кнопки "Додати в кошик" */}
				<Col md={4}>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: '5px solid lightgray',
						}}
					>
						<h3>Від: {product.price} грн.</h3>
						<Button variant={'outline-dark'}>Додати в кошик</Button>
					</Card>
				</Col>
			</Row>

			{/* Рядок для відображення опису товару */}
			<Row className='d-flex flex-column m-3'>
				<h1>Опис товару:</h1>
				{product.info.map((info, index) => (
					<Row
						key={info.id}
						style={{
							background: index % 2 === 0 ? 'lightgray' : 'transparent',
							padding: 10,
						}}
					>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	)
}

export default ProductPage
