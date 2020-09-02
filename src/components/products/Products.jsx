import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import Notification from "../common/Notification"
import Loading from "../common/Loading"
import Container from "../common/Container"
import List from '../common/List'
import Footer from '../common/Footer'
import Confirm from "../common/Confirm"
import Scanner from '../common/BarcodeScanner'
import Search from '../common/Search'
import { getProducts, deleteProduct } from "../../services/products"
import { columns } from './list.json'

const Products = () => {
  const [products, setProducts] = useState({ rows: [] })
  const [alert, setAlert] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [redirect, setRedirect] = useState('')
  const [update, setUpdate] = useState(false)
  const [product, setProduct] = useState({})
  const [showScan, setShowScan] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getProducts(search)
      .then((products) => {
        setProducts(products)
        setIsLoading(false)
        if (!products.count) {
          setAlert({ message: 'La tabla no tiene registros para mostrar', type: 'is-light' })
        }
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "is-danger" })
        setIsLoading(false)
      })
  }, [search])

  const clearAlert = () => {
    setAlert({})
  }

  const handleEdit = (e, product) => {
    e.preventDefault()
    setRedirect({ pathname: "/edit-product", state: { product } })
  }

  const handleDelete = (e, product) => {
    e.preventDefault()
    setProduct(product)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    deleteProduct(product)
      .then(() => {
        setProduct({})
        setUpdate(!update)
        setIsLoading(false)
      })
      .catch(error => {
        setProduct({})
        setAlert({ message: error.message, type: 'is-danger' })
        setIsLoading(false)
      })
  }

  const handleScan = e => {
    e.preventDefault()
    setShowScan(true)
  }

  const handleRead = code => {
    if (code) {
      setSearch(code)
    }
    setShowScan(false)
  }

  const handleSearch = e => {
    e.preventDefault()
    setShowSearch(true)
  }

  const handleText = text => {
    if (text) {
      setSearch(text)
    }
    setShowSearch(false)
  }

  const { rows } = products
  return (
    <>
      {redirect && <Redirect to={redirect} />}

      <Container
        title="Productos"
        subTitle="Administración de productos"
        width="is-6"
        background="is-info"
      >
        <Notification message={alert.message} className="mx-1 my-1" clear={clearAlert} type={alert.type} />

        <List
          rows={rows}
          columns={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <Confirm
          title="Eliminando producto"
          message={
            <span>
              Confirma eliminación de producto <strong>{product.name}</strong>?
            </span>
          }
          handleOk={confirmDelete}
          isActive={product.id}
          close={() => setProduct({})}
        />

        {isLoading && <Loading />}

      </Container>
      <Footer
        onAdd={() => setRedirect('/add-product')}
        onScan={(e) => handleScan(e)}
        onSearch={(e) => handleSearch(e)}
        onTop="true"
      />
      <Scanner
        show={showScan}
        codeRead={handleRead}
      />

      <Search
        show={showSearch}
        handleText={handleText}
      />

    </>
  )
}

export default Products
