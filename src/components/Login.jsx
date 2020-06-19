import React from 'react'

const Login = () => {

	return (

		<section className="hero has-background-grey-light is-fullheight">
			<div className="hero-body">
				<div className="container">
					<div className="columns is-centered">
						<div className="column is-4">
							<form className="box">

								<h3 className="title is-3">Login</h3>

								<div className="field">
									<div className="control has-icons-left">
										<input type="text" placeholder="Usuario" className="input"
											required />
										<span className="icon is-small is-left">
											<i className="fa fa-user"></i>
										</span>
									</div>
								</div>

								<div className="field">
									<div className="control has-icons-left">
										<input type="password" placeholder="********" className="input" required />
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
									<button className="button is-primary is-fullwidth">Login</button>
								</div>

								<div className="field">
									<div className="control">
										<a href="#" className="is-link">Olvidé mi password</a>
									</div>
								</div>

							</form>
						</div>
					</div>

				</div>

			</div>

		</section>


	)


}

export default Login