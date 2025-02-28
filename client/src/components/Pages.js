import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Pagination } from 'react-bootstrap'

/**
 * Компонент пагінації.
 * Відображає список сторінок і дозволяє користувачеві перемикатися між ними.
 *
 * @component
 */
const Pages = observer(() => {
	const { product } = useContext(Context)

	// Обчислення кількості сторінок
	const pageCount = Math.ceil(product.totalCount / product.limit)
	const pages = []

	// Заповнення масиву сторінок
	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}

	return (
		<Pagination className='mt-3'>
			{pages.map(page => (
				<Pagination.Item
					key={page}
					active={product.page === page}
					onClick={() => product.setPage(page)}
				>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	)
})

export default Pages
