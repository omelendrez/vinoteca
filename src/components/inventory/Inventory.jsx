import React, { useState, useEffect } from "react"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from "../common/TableFooter"
import { getInventory } from '../../services/inventory'
import { formatAmount } from "../../helpers"

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

        <div className="container list-container">

          {rows && rows.map((inventory, index) => {
            const { quantity, storeName, productName, price, created, createdByName, updated, updatedByName } = inventory
            return (
              <TableItem
                key={index}
                item={inventory}
                itemHeader={productName}
              >

                <TableItemField label="Producto" value={productName} />
                <TableItemField label="Depósito" value={storeName} />
                <TableItemField label="Cantidad" value={quantity} />
                <TableItemField label="Precio unitario" value={formatAmount(price)} />
                <TableItemField label="Total" value={formatAmount(price * quantity)} />

                <TableFooter
                  statusName=""
                  created={created}
                  createdByName={createdByName}
                  updated={updated}
                  updatedByName={updatedByName}
                />
              </TableItem>
            )
          })
          }
        </div>

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default Inventory