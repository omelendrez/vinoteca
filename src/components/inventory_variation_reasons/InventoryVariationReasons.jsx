import React, { useState, useEffect } from 'react'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getInventoryVariationReasons } from '../../services/inventory_variation_reasons'
import { formatDateFull } from '../../helpers'

const InventoryVariationReasons = () => {
  const [inventoryVariationReasons, setInventoryVariationReasons] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getInventoryVariationReasons()
      .then(inventoryVariationReasons => {
        setInventoryVariationReasons(inventoryVariationReasons)
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

  const handleEdit = (e, inventoryVariationReason) => {
    e.preventDefault()
    console.log(inventoryVariationReason)
  }

  const handleDelete = (e, inventoryVariationReason) => {
    e.preventDefault()
    console.log(inventoryVariationReason)
  }

  const { rows } = inventoryVariationReasons
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Motivos de variación de inventario"
        subTitle="Admnistración de empresas"
        width="is-6"
        background="is-primary"
      >
        {rows && rows.map((inventoryVariationReason, index) => {
          const { code, name, created } = inventoryVariationReason
          return (
            <TableItem key={index} item={inventoryVariationReason} itemHeader={name} handleEdit={handleEdit} handleDelete={handleDelete}>
              <TableItemField label="Código" value={code} />
              <TableItemField label="Razón" value={name} />
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

export default InventoryVariationReasons