import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import ListGroup from 'react-bootstrap/ListGroup'

/**
 * Компонент панелі вибору типу товару.
 * Відображає список доступних типів і дозволяє вибрати один із них.
 *
 * @component
 */
const TypeBar = observer(() => {
	const { product } = useContext(Context)

	return (
		<ListGroup>
			{product.types.map(type => (
				<ListGroup.Item
					style={{ cursor: 'pointer' }}
					active={type.id === product.selectedType.id}
					onClick={() => product.setSelectedType(type)}
					key={type.id}
				>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})

export default TypeBar
