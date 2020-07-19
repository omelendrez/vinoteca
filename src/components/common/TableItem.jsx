import React from 'react'

const TableItem = ({ item, itemHeader, children, handleEdit, handleDelete }) => (
  <div className="card my-3 mx-1">
    <header className="card-header has-background-primary">
      <p className="card-header-title">
        {itemHeader}
      </p>
    </header>

    <div className="card-content">
      <div className="content">
        {children}
      </div>
    </div>

    <footer className="card-footer">
      {handleEdit && <a href="# " className="card-footer-item has-text-info" onClick={e => handleEdit(e, item)}><i className="fa fa-2x fa-info-circle"></i></a>}
      {handleDelete && <a href="# " className="card-footer-item has-text-danger" onClick={e => handleDelete(e, item)}><i className="fa fa-2x fa-minus-circle"></i></a>}
    </footer>
  </div>

)

export default TableItem