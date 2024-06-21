import React from 'react'
import { useAuth } from '../contexts/auth'
import SignRoutes from './SignRoutes'
import OtherRoutes from './OtherRoutes'

const Routes = () => {
    const Auth = useAuth()
    if(Auth.signed)
        return <OtherRoutes />  
    else
        return <SignRoutes />
    
}

export default Routes