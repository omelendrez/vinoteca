import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import Footer from '../common/Footer'
import Confirm from "../common/Confirm"
import { getSales, deleteSale } from "../../services/sales"
import { columns } from './list.json'

const Sales = () => {
  const [sales, setSales] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [sale, setSale] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getSales()
      .then((sales) => {
        setSales(sales)
        setIsLoading(false)
        if (!sales.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
        setIsLoading(false)
      })
  }, [update])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, sale) => {
    e.preventDefault()
    setRedirect({ pathname: `/sale-details/${sale.id}`, state: { sale } })
  }

  const handleDelete = async (e, sale) => {
    e.preventDefault()
    clearAlert()
    setSale(sale)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    deleteSale(sale)
      .then(() => {
        setSale({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setSale({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const { rows } = sales
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Ventas"
        subTitle="Admnistración de ventas"
        width="is-6"
        background="is-warning"
      >

        <Notification className="mx-1 my-1"
          message={alert.message}
          clear={clearAlert}
          type={alert.type}
        />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando venta"
          message={<span>Confirma eliminación de la venta <strong>{`Nro. ${sale.number}`}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={sale.id}
          close={() => setSale({})}
        />

        {isLoading && <Loading />}

      </Container>
      <Footer
        onAdd={() => setRedirect('/add-sale')}
        onTop="true"
      />

    </>
  )
}

export default Sales
