import React from 'react'

const TableItem = ({ item, itemHeader, children, handleEdit, handleDelete }) => (
  <div className="card my-3 mx-2">
    <header className="card-header has-background-link-dark">
      <p className="card-header-title  has-text-white">
        {itemHeader}
      </p>
    </header>

    <div className="card-content">
      <div className="content">
        {children}
      </div>
    </div>

    <footer className="card-footer">
      <a href="# " className="card-footer-item has-text-info" onClick={e => handleEdit(e, item)}><i className="fa fa-edit"></i></a>
      <a href="# " className="card-footer-item has-text-danger" onClick={e => handleDelete(e, item)}><i className=" fa fa-trash-alt"></i></a>
    </footer>
  </div>

)

export default TableItem