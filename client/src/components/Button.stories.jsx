import React from 'react'
import Button from './Button'

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		variant: {
			control: { type: 'radio', options: ['outlined', 'filled'] },
		},
		label: {
			control: { type: 'text' },
		},
	},
}

const Template = args => <Button {...args} />

export const LoginOutlined = Template.bind({})
LoginOutlined.args = {
	label: 'Увійти',
	variant: 'outlined',
}

export const LoginFilled = Template.bind({})
LoginFilled.args = {
	label: 'Увійти',
	variant: 'filled',
}

export const RegisterOutlined = Template.bind({})
RegisterOutlined.args = {
	label: 'Зареєструватися',
	variant: 'outlined',
}

export const RegisterFilled = Template.bind({})
RegisterFilled.args = {
	label: 'Зареєструватися',
	variant: 'filled',
}
