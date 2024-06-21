import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../views/Login'

const SignRoutes = () => {
  return (
    <Routes>
      <Route 
          path='/*' 
          element={
              <Login />
          } 
      />
    </Routes>
  )
}

export default SignRoutes