import React, { useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./components/Login"
import Login from "./components/Login"
import NavBar from "./components/NavBar"

import Home from "./components/Home"
import Companies from "./components/companies/Companies"
import Profiles from "./components/profiles/Profiles"
import Users from "./components/users/Users"
import Stores from "./components/stores/Stores"

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
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/users" exact component={Users} />
              <Route path="/stores" exact component={Stores} />
            </Switch>
          </main>
        )}
      </BrowserRouter>
    </>
  )
}

export default App
