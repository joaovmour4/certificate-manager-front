import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { JwtPayload } from 'jwt-decode'
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import { Usuario } from './components/ActivitiesTable/ActivitiesTable';
import { AuthProvider } from './contexts/auth';
import Routes from './routes/Routes';

interface Setor{
  idSetor: number
  setorName: string
}
interface Token extends JwtPayload{
  user: Usuario
}

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col min-h-screen'>
        <AuthProvider >
          <Header />
          <Routes />
          <Footer />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export type { Token, Setor }
export default App;
