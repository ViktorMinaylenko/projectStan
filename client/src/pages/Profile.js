import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deleteAccount, exportData } from '../http/userAPI'
import { Context } from '../index'

const Profile = () => {
	const navigate = useNavigate()
	const { user } = useContext(Context)

	const handleDeleteAccount = async () => {
		try {
			const confirmDelete = window.confirm(
				'Ви впевнені, що хочете видалити свій обліковий запис? Ця дія незворотня.'
			)
			if (confirmDelete) {
				await deleteAccount()
				localStorage.removeItem('token')
				user.setUser({})
				user.setIsAuth(false)
				navigate('/')
				alert('Ваш обліковий запис успішно видалено.')
			}
		} catch (e) {
			alert(
				'Помилка при видаленні облікового запису: ' +
					e.response?.data?.message || e.message
			)
		}
	}
	const handleExportData = async () => {
		try {
			const data = await exportData()
			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: 'application/json',
			})
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = 'user-data.json'
			link.click()
			URL.revokeObjectURL(url)
		} catch (e) {
			alert(
				'Помилка при експорті даних: ' + e.response?.data?.message || e.message
			)
		}
	}

	return (
		<div style={{ padding: '20px' }}>
			<h1>Профіль</h1>
			<Button
				variant='danger'
				onClick={handleDeleteAccount}
				style={{ marginRight: '10px' }}
			>
				Видалити обліковий запис
			</Button>
			<Button variant='primary' onClick={handleExportData}>
				Експортувати мої дані
			</Button>
		</div>
	)
}

export default Profile
