import React, { useState, useEffect } from "react"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import { getInventory } from '../../services/inventory'
import { columns } from './list.json'

const Inventory = () => {
  const [inventory, setInventory] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getInventory()
      .then((inventory) => {
        setInventory(inventory)
        setIsLoading(false)
        if (!inventory.count) {
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

  const { rows } = inventory
  return (
    <>
      <Container
        title="Inventario"
        subTitle="Listado de inventario"
        width="is-6"
        background="is-info"
      >

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

export default Inventory