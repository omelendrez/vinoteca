import React, { useState, useEffect } from 'react'
import Notification from '../Notification'
import Loading from '../Loading'
import { getCompanies } from '../../services/companies'
import { formatDateFull } from '../../helpers'

const Companies = () => {
  const [companies, setCompanies] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCompanies()
      .then(companies => {
        setCompanies(companies)
        setIsLoading(false)
      })
      .catch(error => {
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }, [])

  const clearAlert = () => {
    setAlert({})
  }
  const { rows } = companies
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}
      <section className="hero is-warning">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Empresas
            </h1>
            <h2 className="subtitle">
              Administración de empresas
            </h2>
          </div>
          {rows &&
            <section>
              {rows.map((company, index) => {
                const { name, contact, address, email, phone, created } = company
                return (
                  <div className="card my-3" key={index}>
                    <header className="card-header has-background-success-dark">
                      <p className="card-header-title  has-text-white">
                        {name}
                      </p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        <div><i className="fa fa-user mr-2"></i>{contact}</div>
                        <div><i className="fa fa-map-marker-alt mr-2"></i>{address}</div>
                        <div><i className="fa fa-at mr-2"></i>{email}</div>
                        <div><i className="fa fa-phone mr-2"></i>{phone}</div>
                        <br />
                        <time><i className="fa fa-calendar-alt mr-2"></i>{formatDateFull(created)}</time>
                      </div>
                    </div>
                    <footer className="card-footer">
                      <a href="#" className="card-footer-item"><i className="fa fa-edit"></i></a>
                      <a href="#" className="card-footer-item"><i className="fa fa-trash"></i></a>
                    </footer>
                  </div>
                )
              }
              )}
            </section>}
        </div>
      </section>
      {isLoading && <Loading />}
    </>
  )
}

export default Companies