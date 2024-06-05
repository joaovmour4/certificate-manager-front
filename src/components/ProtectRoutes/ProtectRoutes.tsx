import React from 'react'
import { Navigate } from 'react-router-dom'
interface props{
    isAuthenticated: boolean
    children: React.ReactElement
}

const ProtectRoutes = (props: props) => {
  if(!props.isAuthenticated)
    return <Navigate to='/login' replace />

  return props.children
}

export default ProtectRoutes