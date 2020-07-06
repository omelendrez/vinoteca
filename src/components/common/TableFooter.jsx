import React from 'react'
import TableItemField from "./TableItemField"
import { formatDateFromNow } from "../../helpers"

const TableFooter = ({ statusName, created, createdByName, updated, updatedByName }) => {
  return (
    <>
      <hr className="dropdown-divider" />
      {statusName && <TableItemField icon="far fa-eye mr-2" label="Status" value={statusName} />}
      <TableItemField icon="far fa-clock mr-2" label="Creado" value={`${createdByName}, ${formatDateFromNow(created)}`} />
      {updatedByName &&
        <TableItemField label="Modificado" icon="far fa-clock mr-2" value={`${updatedByName}, ${formatDateFromNow(updated)}`} />
      }
    </>
  )
}

export default TableFooter