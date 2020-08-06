import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import { getInventoryVariations } from "../../services/inventory_variations"
import { columns } from './variationList.json'

const InventoryVariations = () => {
  const [inventoryVariations, setInventoryVariations] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getInventoryVariations()
      .then((inventoryVariations) => {
        setInventoryVariations(inventoryVariations)
        setIsLoading(false)
        if (!inventoryVariations.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }

      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
        setIsLoading(false)
      })
  }, [])

  const clearAlert = () => {
    setAlert({})
  }

  const { rows } = inventoryVariations
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Container
        title="Correcciones de inventario"
        subTitle="Administración de inventario"
        width="is-6"
        background="is-info"
      >

        <button className="button mx-1 my-1" onClick={() => setRedirect("/add-inventory-variation")}>
          Agregar
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default InventoryVariations
