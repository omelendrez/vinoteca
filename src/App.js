import React, { useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./components/Login"
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import './App.scss'

import Home from "./components/Home"
import Companies from "./components/companies/Companies"
import CompanyForm from './components/companies/CompanyForm'
import Profiles from "./components/profiles/Profiles"
import ProfileForm from './components/profiles/ProfileForm'
import Products from "./components/products/Products"
import ProductForm from "./components/products/ProductForm"
import Categories from "./components/categories/Categories"
import CategoryForm from "./components/categories/CategoryForm"
import Users from "./components/users/Users"
import UserForm from "./components/users/UserForm"
import ChangePassword from './components/users/ChangePassword'
import Suppliers from "./components/suppliers/Suppliers"
import SupplierForm from "./components/suppliers/SupplierForm"
import Stores from "./components/stores/Stores"
import StoreForm from './components/stores/StoreForm'
import VariationReasons from "./components/variation_reasons/VariationReasons"
import VariationReasonForm from "./components/variation_reasons/VariationReasonForm"
import InventoryVariations from "./components/inventory/InventoryVariations"
import InventoryVariationForm from "./components/inventory/InventoryVariationForm"

function App() {
  const [user, setUser] = useState({})
  return (
    <>
      <BrowserRouter>
        <NavBar user={user} setUser={setUser} />
        {!user.id && <Login setUser={setUser} />}

        {user.id && (
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/companies" exact component={Companies} />
              <Route path="/edit-company" exact component={CompanyForm} />
              <Route path="/add-company" exact component={CompanyForm} />
              <Route path="/products" exact component={Products} />
              <Route path="/edit-product" exact component={ProductForm} />
              <Route path="/add-product" exact component={ProductForm} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/edit-category" exact component={CategoryForm} />
              <Route path="/add-category" exact component={CategoryForm} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/edit-profile" exact component={ProfileForm} />
              <Route path="/add-profile" exact component={ProfileForm} />
              <Route path="/stores" exact component={Stores} />
              <Route path="/edit-store" exact component={StoreForm} />
              <Route path="/add-store" exact component={StoreForm} />
              <Route path="/suppliers" exact component={Suppliers} />
              <Route path="/edit-supplier" exact component={SupplierForm} />
              <Route path="/add-supplier" exact component={SupplierForm} />
              <Route path="/users" exact component={Users} />
              <Route path="/edit-user" exact component={UserForm} />
              <Route path="/add-user" exact component={UserForm} />
              <Route path='/change-password' exact component={ChangePassword} />
              <Route path="/variation-reasons" exact component={VariationReasons} />
              <Route path="/edit-variation-reason" exact component={VariationReasonForm} />
              <Route path="/add-variation-reason" exact component={VariationReasonForm} />
              <Route path="/inventory-variations" exact component={InventoryVariations} />
              <Route path="/add-inventory-variation" exact component={InventoryVariationForm} />
            </Switch>
          </main>
        )}
      </BrowserRouter>
    </>
  )
}

export default App