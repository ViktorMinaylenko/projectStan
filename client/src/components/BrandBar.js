import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Card, Row, Col } from 'react-bootstrap'

const BrandBar = observer(() => {
	const { product } = useContext(Context)

	return (
		<Row className='d-flex flex-row'>
			{product.brands.map(brand => (
				<Col xs='auto' key={brand.id} className='mb-3'>
					<Card
						style={{
							cursor: 'pointer',
							minWidth: '150px',
							textAlign: 'center',
						}}
						className='p-3'
						onClick={() => product.setSelectedBrand(brand)}
						border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
					>
						{brand.name}
					</Card>
				</Col>
			))}
		</Row>
	)
})

export default BrandBar
