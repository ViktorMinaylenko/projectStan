import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import Pages from '../components/Pages'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBrands, fetchProducts, fetchTypes } from '../http/productAPI'

/**
 * Основна сторінка магазину.
 * Завантажує список категорій, брендів та товарів.
 * Включає фільтри та пагінацію.
 */
const Shop = observer(() => {
	const { product } = useContext(Context)

	// Завантаження типів, брендів і товарів при першому рендері
	useEffect(() => {
		fetchTypes().then(data => product.setTypes(data)) // Категорії товарів
		fetchBrands().then(data => product.setBrands(data)) // Бренди
		fetchProducts(null, null, 1, 2).then(data => {
			product.setProducts(data.rows) // Збереження товарів у стан
			product.setTotalCount(data.count) // Збереження загальної кількості товарів
		})
	}, [])

	// Завантаження товарів при зміні фільтра або сторінки
	useEffect(() => {
		fetchProducts(
			product.selectedType.id, // Фільтр за типом
			product.selectedBrand.id, // Фільтр за брендом
			product.page, // Номер сторінки
			2 // Кількість товарів на сторінку
		).then(data => {
			product.setProducts(data.rows) // Оновлення товарів
			product.setTotalCount(data.count) // Оновлення загальної кількості
		})
	}, [product.page, product.selectedType, product.selectedBrand])

	return (
		<Container>
			<Row className='mt-2'>
				{/* Ліва частина - фільтр за категоріями */}
				<Col md={3}>
					<TypeBar />
				</Col>

				{/* Права частина - фільтр за брендами, список товарів і пагінація */}
				<Col md={9}>
					<BrandBar />
					<ProductList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})

export default Shop
