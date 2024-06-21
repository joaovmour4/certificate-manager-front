import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Certificates from '../views/Certificates'
import Emails from '../views/Emails'
import AddCertificates from '../views/AddCertificates'
import Activities from '../views/Activities'
import Companies from '../views/Companies'
import Users from '../views/Users'
import Obrigacoes from '../views/Obrigacoes'

const OtherRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/certificados' element={<Certificates />}/>
      <Route path='/emails' element={<Emails />} />
      <Route path='/adicionarCertificado' element={<AddCertificates />} />
      <Route path='/atividades' element={<Activities />} />
      <Route path='/empresas' element={<Companies />} />
      <Route path='/usuarios' element={<Users />}/>
      <Route path='/obrigacoes' element={<Obrigacoes />}/>
    </Routes>
  )
}

export default OtherRoutes