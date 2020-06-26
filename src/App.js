import React, { useState } from 'react'
import './components/Login'
import Login from './components/Login'
import NavBar from './components/NavBar'

function App() {
  const [user, setUser] = useState({})
  return (
    <>
      <NavBar user={user} />
      {!user.id && <Login setUser={setUser} />}
    </>
  )
}

export default App
