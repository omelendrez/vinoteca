import React, { useEffect, useState } from 'react'
import { getBelowMinimum } from '../../services/inventory'

const BelowMinimum = () => {
  const [lowStockProducts, setLowStockProducts] = useState([])

  useEffect(() => {
    getBelowMinimum()
      .then(list => setLowStockProducts(list.rows))
  }, [])

  return (
    <div className="columns mx-4">
      <div className="column is-4 has-background-white">
        <h6 className="has-text-centered my-3">
          Listado de productos con stock mínimo
        </h6>
        <table className="table is-fullwidth is-narrow is-size-7">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock mínimo</th>
              <th>Stock actual</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map(product =>
              <tr>
                <td>{product.name}</td>
                <td>{product.minimum}</td>
                <td>{product.quantity}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BelowMinimum