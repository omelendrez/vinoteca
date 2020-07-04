import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import TableItem from "../common/TableItem"
import TableItemField from "../common/TableItemField"
import TableFooter from "../common/TableFooter"
import { getInventoryVariations } from "../../services/inventory_variations"

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
        title="Productos"
        subTitle="Admnistración de productos"
        width="is-6"
        background="is-info"
      >

        <button className="button mx-1 my-1" onClick={() => setRedirect("/add-inventory-variation")}>
          Agregar
        </button>

        <Notification message={alert.message} clear={clearAlert} type={alert.type} />

        <div className="container list-container">

          {rows && rows.map((inventoryVariation, index) => {
            const { storeName, productCode, productName, quantity, variationType, reasonName, comments, created, createdByName } = inventoryVariation
            return (
              <TableItem
                key={index}
                itemHeader={`${variationType === 1 ? 'Incremento de' : 'Reducción de'} stock por ${reasonName}`}
              >
                <TableItemField icon={`has-text-white fa-lg fas fa-arrow-${variationType === 1 ? 'up has-background-success ' : 'down has-background-danger '} `} value="" />
                <TableItemField label="Producto" value={`${productCode} ${productName}`} />
                <TableItemField label="Cantidad" value={quantity * variationType} />
                <TableItemField label="Depósito" value={storeName} />
                {comments && <TableItemField label="Observaciones" value={comments} />}

                <TableFooter created={created} createdByName={createdByName} />

              </TableItem>
            )
          })
          }
        </div>

        {!rows.length && (
          <Notification
            message="La tabla no contiene registros"
            type="is-light"
            clear={clearAlert}
          />
        )}

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default InventoryVariations
