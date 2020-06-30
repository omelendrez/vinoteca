import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import Confirm from '../common/Confirm'
import { getCompanies, deleteCompany } from '../../services/companies'
import { formatDateFull } from '../../helpers'

const Companies = () => {
  const [companies, setCompanies] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [company, setCompany] = useState({})

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
  }, [update])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, company) => {
    e.preventDefault()
    setRedirect({ pathname: '/edit-company', state: { company } })
  }

  const handleDelete = async (e, company) => {
    e.preventDefault()
    setCompany(company)
    setConfirm(true)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    setConfirm(false)
    await deleteCompany(company)
    setUpdate(!update)
  }

  const { rows } = companies
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Empresas"
        subTitle="Administración de empresas"
        width="is-6"
        background="is-primary"
      >
        <button className="button" onClick={() => setRedirect('/add-company')}>
          Agregar
        </button>
        {rows && rows.map((company, index) => {
          const { name, contact, address, email, phone, created } = company
          return (
            <TableItem
              key={index}
              item={company}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
              <TableItemField icon="fa fa-user mr-2" value={contact} />
              <TableItemField icon="fa fa-map-marker-alt mr-2" value={address} />
              <TableItemField icon="fa fa-at mr-2" value={email} />
              <TableItemField icon="fa fa-phone mr-2" value={phone} />
              <br />
              <TableItemField icon="fa fa-calendar-alt mr-2" value={formatDateFull(created)} />
            </TableItem>
          )
        })
        }
        <Confirm
          title="Eliminando registro"
          message={<span>Confirma eliminación de registro <strong>{company.name}</strong>? </span>}
          handleOk={confirmDelete}
          isActive={confirm}
          close={() => setConfirm(false)}
        />

      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default Companies