import React, { useState, useEffect } from 'react'
import { login } from '../services/login'
import Notification from './Notification'
import { saveData, getData } from '../helper'

const Login = () => {

	const defaultForm = { email: '', password: '' }

	const [form, setForm] = useState(defaultForm)
	const [error, setError] = useState({})
	const [checked, setChecked] = useState(getData('remember'))
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (checked) {
			setForm({ ...form, email: getData('user').email })
		}
	}, [])

	const handleChange = e => {
		if (error) clearError()
		setForm({ ...form, [e.target.id]: e.target.value })
	}

	const clearError = () => {
		setError({})
	}

	const handleClick = e => {
		e.preventDefault()
		setIsLoading(true)
		login(form)
			.then(data => {
				const { token, user } = data
				saveData('token', token)
				saveData('user', user)
				setError({ message: `Bienvenido ${user.name}`, type: 'is-success' })
				setIsLoading(false)
			})
			.catch(error => setError({ message: error.message, type: 'is-danger' }))
	}

	const handleToggle = e => {
		saveData('remember', e.target.checked)
	}

	return (

		<section className="hero has-background-grey is-fullheight">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4">
							<form className="box" style={styles.box}>

								<h3 className="title is-3">Login</h3>

								<div className="field">
									<div className="control has-icons-left">
										<input type="email" placeholder="Email" className="input" id="email" onChange={handleChange}
											value={form.email}
											required />
										<span className="icon is-small is-left">
											<i className="fa fa-at"></i>
										</span>
									</div>
								</div>

								<div className="field">
									<div className="control has-icons-left">
										<input type="password" placeholder="********" className="input" required id="password" onChange={handleChange} />
										<span className="icon is-small is-left">
											<i className="fa fa-key"></i>
										</span>
									</div>
								</div>

								<div className="field">
									<input
										type="checkbox"
										className="mr-1"
										onClick={handleToggle}
										defaultChecked={checked}
									/>
									<label>Recordar email</label>
								</div>

								<div className="field">
									<button className={`button is-info is-fullwidth ${isLoading ? 'is-loading' : ''}`} onClick={handleClick}>Login</button>
								</div>

								<div className="field">
									<div className="control">
										<a href="#">Olvidé mi password</a>
									</div>
								</div>

								{error.message && <Notification message={error.message} clear={clearError} type={error.type} />}

							</form>
						</div>
					</div>

				</div>

			</div>

		</section>


	)


}

const styles = {
	box: {
		height: 370
	}
}

export default Login