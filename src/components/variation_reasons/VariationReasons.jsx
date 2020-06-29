import React, { useState, useEffect } from 'react'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import { getVariationReasons, deleteVariationReason } from '../../services/variation_reasons'
import { formatDateFull } from '../../helpers'

const VariationReasons = () => {
  const [variationReasons, setVariationReasons] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getVariationReasons()
      .then(variationReasons => {
        setVariationReasons(variationReasons)
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

  const handleEdit = (e, variationReason) => {
    e.preventDefault()
    console.log(variationReason)
  }

  const handleDelete = async (e, variationReason) => {
    e.preventDefault()
    setIsLoading(true)
    await deleteVariationReason(variationReason)
    setUpdate(!update)
  }

  const { rows } = variationReasons
  return (
    <>
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Motivos de variación de inventario"
        subTitle="Admnistración de empresas"
        width="is-6"
        background="is-primary"
      >
        {rows && rows.map((variationReason, index) => {
          const { code, name, created } = variationReason
          return (
            <TableItem key={index} item={variationReason} itemHeader={name} handleEdit={handleEdit} handleDelete={handleDelete}>
              <TableItemField label="Código" value={code} />
              <TableItemField label="Razón" value={name} />
              <br />
              <TableItemField icon="fa fa-calendar-alt mr-2" value={formatDateFull(created)} />
            </TableItem>
          )
        })
        }


      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default VariationReasons