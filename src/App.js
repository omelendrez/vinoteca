import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./components/Login";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

import Home from "./components/Home";
import Companies from "./components/companies/Companies";
import Profiles from "./components/profiles/Profiles";
import ProfileForm from './components/profiles/ProfileForm'
import Products from "./components/products/Products";
import Categories from "./components/categories/Categories";
import Users from "./components/users/Users";
import Suppliers from "./components/suppliers/Suppliers";
import Stores from "./components/stores/Stores";
import VariationReasons from "./components/variation_reasons/VariationReasons";
import CompanyForm from './components/companies/CompanyForm'

function App() {
  const [user, setUser] = useState({});
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
              <Route path="/products" exact component={Products} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/stores" exact component={Stores} />
              <Route path="/suppliers" exact component={Suppliers} />
              <Route path="/users" exact component={Users} />
              <Route
                path="/variation-reasons"
                exact
                component={VariationReasons}
              />
              <Route path="/edit-company" exact component={CompanyForm} />
              <Route path="/add-company" exact component={CompanyForm} />
              <Route path="/edit-profile" exact component={ProfileForm} />
              <Route path="/add-profile" exact component={ProfileForm} />
            </Switch>
          </main>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
