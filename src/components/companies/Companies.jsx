import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import List from '../common/List'
import Footer from '../common/Footer'
import Confirm from '../common/Confirm'
import { getCompanies, deleteCompany } from '../../services/companies'
import { columns } from './list.json'

const Companies = () => {
  const [companies, setCompanies] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [company, setCompany] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getCompanies()
      .then(companies => {
        setCompanies(companies)
        setIsLoading(false)
        if (!companies.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch(error => {
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }, [update])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, company) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-company', state: { company } })
  }

  const handleDelete = (e, company) => {
    e.preventDefault()
    setCompany(company)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteCompany(company)
      .then(() => {
        setCompany({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setCompany({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = companies
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Empresas"
        subTitle="Administración de empresas"
        width="is-6"
        background="is-primary"
      >

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando empresa"
          message={<span>Confirma eliminación de la empresa <strong>{company.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={company.id}
          close={() => setCompany({})}
        />

        {isLoading && <Loading />}

      </Container>
      <Footer
        onAdd={() => setRedirect('/add-company')}
        onTop="true"
      />

    </>
  )
}

export default Companies