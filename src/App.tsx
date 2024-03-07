import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home';
import Certificates from './views/Certificates';
import Emails from './views/Emails';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col justify-between'>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Certificates' element={<Certificates/>} />
          <Route path='/Emails' element={<Emails/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
