import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import Confirm from '../common/Confirm'
import { getVariationReasons, deleteVariationReason } from '../../services/variation_reasons'
import { formatDateFull } from '../../helpers'

const VariationReasons = () => {
  const [variationReasons, setVariationReasons] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [variationReason, setVariationReason] = useState({})

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
    setRedirect({ pathname: '/edit-variation-reason', state: { variationReason } })
  }

  const handleDelete = async (e, variationReason) => {
    e.preventDefault()
    setVariationReason(variationReason)
  }

  const confirmDelete = async () => {
    setIsLoading(true)
    await deleteVariationReason(variationReason)
    setVariationReason({})
    setUpdate(!update)
  }

  const { rows } = variationReasons
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {alert.message && <Notification message={alert.message} clear={clearAlert} type={alert.type} />}

      <Container
        title="Motivos de variación de inventario"
        subTitle="Admnistración de empresas"
        width="is-6"
        background="is-primary"
      >
        <button className="button" onClick={() => setRedirect('/add-variation-reason')}>
          Agregar
        </button>
        {rows && rows.map((variationReason, index) => {
          const { code, name, created } = variationReason
          return (
            <TableItem
              key={index}
              item={variationReason}
              itemHeader={name}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            >
              <TableItemField label="Código" value={code} />
              <TableItemField label="Razón" value={name} />
              <br />
              <TableItemField icon="fa fa-calendar-alt mr-2" value={formatDateFull(created)} />
            </TableItem>
          )
        })
        }
        <Confirm
          title="Eliminando razón de variación"
          message={<span>Confirma eliminación de la razón de variación <strong>{variationReason.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={variationReason.id}
          close={() => setVariationReason({})}
        />

      </Container>

      {!rows.length && <Notification message="La tabla no contiene registros" type="is-light" clear={clearAlert} />}

      {isLoading && <Loading />}

    </>
  )
}

export default VariationReasons