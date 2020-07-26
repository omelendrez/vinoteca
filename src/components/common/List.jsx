import React from 'react'
import ListItem from './ListItem'
import ListItemField from './ListItemField'
import ListFooter from './ListFooter'

const List = ({ rows, columns, handleEdit, handleDelete }) => {
  return (
    <div className="container list-container">
      {rows.length > 0 && rows.map((row, index) => {
        const header = []
        columns.map(column => column.isHeader ? header.push(row[column.columnId]) : '')
        return (
          <ListItem
            key={index}
            item={row}
            itemHeader={header.join(' - ')}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          >
            {
              columns.filter(column => !column.isHeader).map((column, index) => <ListItemField key={index} column={column} value={row[column.columnId]} />)
            }
            <ListFooter
              row={row}
            />
          </ListItem>
        )
      })
      }
    </div>
  )
}

export default List