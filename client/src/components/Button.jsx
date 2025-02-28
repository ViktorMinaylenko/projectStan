import React from 'react'
import PropTypes from 'prop-types'
import './Button.css' // Файл стилів для кнопки

const Button = ({ label, variant, onClick }) => {
	return (
		<button className={`btn ${variant}`} onClick={onClick}>
			{label}
		</button>
	)
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['outlined', 'filled']),
	onClick: PropTypes.func,
}

Button.defaultProps = {
	variant: 'filled',
	onClick: () => {},
}

export default Button
