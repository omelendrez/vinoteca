import React, { useState } from 'react'
import { login, forgotPassword } from '../services/login'
import Notification from './common/Notification'
import { saveData, getData } from '../localStorage'

const Login = ({ setUser }) => {

	const checked = getData('remember')
	const defaultForm = { email: checked && getData('user') ? getData('user').email : '', password: '' }
	const [form, setForm] = useState(defaultForm)
	const [alert, setAlert] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = e => {
		if (alert) clearAlert()
		setForm({ ...form, [e.target.id]: e.target.value })
	}

	const clearAlert = () => {
		setAlert({})
	}

	const handleClick = e => {
		e.preventDefault()
		if (!form.email || !form.password) {
			return setAlert({ message: 'Debe ingresar email y pasword', type: 'is-danger' })
		}
		setIsLoading(true)
		login(form)
			.then(data => {
				const { token, user } = data
				saveData('token', token)
				saveData('user', user)
				setAlert({ message: `Bienvenido ${user.name}`, type: 'is-success' })
				setIsLoading(false)
				setUser(user)
			})
			.catch(error => {
				setAlert({ message: error.message, type: 'is-danger' })
				setIsLoading(false)
			})
	}

	const handleToggle = e => {
		saveData('remember', e.target.checked)
	}

	const handleForgotPassword = e => {
		e.preventDefault()
		if (!form.email) {
			return setAlert({ message: 'Ingrese su dirección de email', type: 'is-danger' })
		}
		const user = {
			"emailAddress": form.email
		}
		setIsLoading(true)
		forgotPassword(user)
			.then(data => {
				setAlert({ message: 'Te hemos enviado un email a esa cuenta con instrucciones', type: 'is-danger' })
				setIsLoading(false)
			})
			.catch(error => {
				setAlert({ message: error.message, type: 'is-danger' })
				setIsLoading(false)
			})
	}

	return (

		<section className="hero is-fullheight">
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
									<label className="checkbox">
										<input
											type="checkbox"
											className="mr-1"
											onClick={handleToggle}
											defaultChecked={checked}
										/>
										Recordar email
									</label>
								</div>

								<div className="field">
									<button className={`button is-info is-fullwidth ${isLoading ? 'is-loading' : ''}`} onClick={handleClick}>Login</button>
								</div>

								<div className="field">
									<div className="control">
										<a href="# " onClick={handleForgotPassword}>Olvidé mi password</a>
									</div>
								</div>

								{alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

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