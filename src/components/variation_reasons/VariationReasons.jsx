import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Notification from '../common/Notification'
import Loading from '../common/Loading'
import Container from '../common/Container'
import TableItem from '../common/TableItem'
import TableItemField from '../common/TableItemField'
import TableFooter from '../common/TableFooter'
import Confirm from '../common/Confirm'
import { getVariationReasons, deleteVariationReason } from '../../services/variation_reasons'

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
        if (!variationReasons.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
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

  const confirmDelete = () => {
    setIsLoading(true)
    deleteVariationReason(variationReason)
      .then(() => {
        setVariationReason({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setVariationReason({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })

  }

  const { rows } = variationReasons
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Motivos de variación de inventario"
        subTitle="Admnistración de empresas"
        width="is-6"
        background="is-primary"
      >
        <button className="button mx-1 my-1" onClick={() => setRedirect('/add-variation-reason')}>
          Agregar
        </button>

        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <div className="container list-container">

          {rows && rows.map((variationReason, index) => {
            const { code, name, statusName, created, createdByName, updated, updatedByName } = variationReason
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

                <TableFooter
                  statusName={statusName}
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

        <Confirm
          title="Eliminando razón de variación"
          message={<span>Confirma eliminación de la razón de variación <strong>{variationReason.name}</strong>?</span>}
          handleOk={confirmDelete}
          isActive={variationReason.id}
          close={() => setVariationReason({})}
        />

        {isLoading && <Loading />}

      </Container>

    </>
  )
}

export default VariationReasons