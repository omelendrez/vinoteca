import React from 'react'
import TableItemField from "./TableItemField"
import { formatDateFull } from "../../helpers"

const TableFooter = ({ statusName, created, createdByName, updated, updatedByName }) => {
  return (
    <>
      <hr />
      <TableItemField icon="fa fa-calendar-alt mr-2" label="Status" value={statusName} />
      <TableItemField icon="fa fa-calendar-alt mr-2" label="Creado" value={`${createdByName} ${formatDateFull(created)}`} />
      {created !== updated &&
        <TableItemField label="Modificado" icon="fa fa-calendar-alt mr-2" value={`${updatedByName} ${formatDateFull(updated)}`} />
      }
    </>
  )
}

export default TableFooter