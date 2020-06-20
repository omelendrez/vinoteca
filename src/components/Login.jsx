import React, { useState } from 'react'
import { login } from '../services/login'
import Notification from './Notification'

const Login = () => {

	const defaultForm = { user: '', password: '' }

	const [form, setForm] = useState(defaultForm)
	const [error, setError] = useState('')

	const handleChange = e => {
		if (error) clearError()
		setForm({ ...form, [e.target.id]: e.target.value })
	}

	const clearError = () => {
		setError('')
	}

	const handleClick = e => {
		e.preventDefault()
		login(form)
			.then(data => console.log(data))
			.catch(error => setError(error.message))
	}

	return (

		<section className="hero has-background-grey is-fullheight">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4">
							<form className="box">

								<h3 className="title is-3">Login</h3>

								<div className="field">
									<div className="control has-icons-left">
										<input type="text" placeholder="Usuario" className="input" id="user" onChange={e => handleChange(e)}
											required />
										<span className="icon is-small is-left">
											<i className="fa fa-user"></i>
										</span>
									</div>
								</div>

								<div className="field">
									<div className="control has-icons-left">
										<input type="password" placeholder="********" className="input" required id="password" onChange={e => handleChange(e)} />
										<span className="icon is-small is-left">
											<i className="fa fa-key"></i>
										</span>
									</div>
								</div>

								<div className="field">
									<input type="checkbox" className="mr-1" />
									<label>Recordar usuario</label>
								</div>

								<div className="field">
									<button className="button is-info is-fullwidth" onClick={e => handleClick(e)}>Login</button>
								</div>

								<div className="field">
									<div className="control">
										<a href="#" className="is-link">Olvidé mi password</a>
									</div>
								</div>

								{error && <Notification message={error} clear={clearError} />}

							</form>
						</div>
					</div>

				</div>

			</div>

		</section>


	)


}

export default Login