import React, { useState, useEffect } from 'react'
import Notification from '../Notification'
import Loading from '../Loading'
import Container from '../Container'
import TableItem from '../TableItem'
import TableItemField from '../TableItemField'
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

  const handleEdit = (e, company) => {
    e.preventDefault()
    console.log(company)
  }

  const handleDelete = (e, company) => {
    e.preventDefault()
    console.log(company)
  }

  const { rows } = companies
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container title="Empresas" subTitle="Administración de empresas" width="is-8" background="is-light" >
        {rows && rows.map((company, index) => {
          const { name, contact, address, email, phone, created } = company
          return (
            <TableItem key={index} itemHeader={name} handleEdit={handleEdit} handleDelete={handleDelete} >
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
      </Container>

      {isLoading && <Loading />}

    </>
  )
}

export default Companies