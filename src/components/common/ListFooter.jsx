import React from 'react'
import ListFooterItemField from "./ListFooterItemField"
import { formatDateFromNow } from "../../helpers"

const ListFooter = ({ row }) => {
  const { statusName, created, createdByName, updated, updatedByName } = row
  return (
    <>
      <hr className="dropdown-divider" />
      {statusName && <ListFooterItemField icon="far fa-eye mr-2" label="Status" value={statusName} />}
      <ListFooterItemField icon="far fa-clock mr-2" label="Creado" value={`${createdByName}, ${formatDateFromNow(created)}`} />
      {updatedByName &&
        <ListFooterItemField label="Modificado" icon="far fa-clock mr-2" value={`${updatedByName}, ${formatDateFromNow(updated)}`} />
      }
    </>
  )
}

export default ListFooter