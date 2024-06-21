import React from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../contexts/auth'
interface props{
    children: React.ReactElement
}

const ProtectRoutes = (props: props) => {
  const Auth = React.useContext(AuthContext)
  if(!Auth.signed)
    return <Navigate to='/login' replace />

  return props.children
}

export default ProtectRoutes