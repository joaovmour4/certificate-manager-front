import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home';
import Certificates from './views/Certificates';
import Emails from './views/Emails';
import AddCertificates from './views/AddCertificates';
import Activities from './views/Activities';
import Login from './views/Login';
import api from './services/api';

function App() {
  React.useEffect(()=>{
    api
        .get('user/1')
        .then(response => {
            sessionStorage.setItem('user', JSON.stringify(response.data))
        })
  }, [])
  return (
    <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/certificados' element={<Certificates />} />
            <Route path='/emails' element={<Emails />} />
            <Route path='/adicionarCertificado' element={<AddCertificates />} />
            <Route path='/atividades' element={<Activities />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
