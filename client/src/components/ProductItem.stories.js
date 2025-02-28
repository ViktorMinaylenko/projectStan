import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import ProductItem from './ProductItem'

export default {
	title: 'Components/ProductItem',
	component: ProductItem,
	decorators: [
		Story => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
}

export const Default = () => (
	<ProductItem
		product={{
			id: 1,
			name: 'Футболка GYMSHARK',
			image_url: '/images/shirt.jpg',
			rating: 4.5,
			price: 1200,
		}}
	/>
)


export const HighRating = () => (
	<ProductItem
		product={{
			id: 3,
			name: 'Кросівки GYMSHARK',
			image_url: '/images/shoes.jpg',
			rating: 5.0,
			price: 2500,
		}}
	/>
)

export const LowRating = () => (
	<ProductItem
		product={{
			id: 4,
			name: 'Сумка GYMSHARK',
			image_url: '/images/bag.jpg',
			rating: 2.5,
			price: 800,
		}}
	/>
)

export const NoRating = () => (
	<ProductItem
		product={{
			id: 5,
			name: 'Кепка GYMSHARK',
			image_url: '/images/cap.jpg',
			rating: null,
			price: 500,
		}}
	/>
)

export const LongName = () => (
	<ProductItem
		product={{
			id: 6,
			name: 'Дуже довга назва товару, яка не поміщається в одну строку',
			image_url: '/images/long-name.jpg',
			rating: 4.2,
			price: 1000,
		}}
	/>
)

export const Discounted = () => (
	<ProductItem
		product={{
			id: 7,
			name: 'Куртка GYMSHARK',
			image_url: '/images/jacket.jpg',
			rating: 4.7,
			price: 3000,
			discount: 20,
		}}
	/>
)
