import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import './App.css';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home';
import Certificates from './views/Certificates';
import Emails from './views/Emails';
import AddCertificates from './views/AddCertificates';
import Activities from './views/Activities';
import Login from './views/Login';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import authVerify from './services/authVerify';
import { Usuario } from './components/ActivitiesTable/ActivitiesTable';

function App() {
  const [userToken, setUserToken] = React.useState<string | null>(window.localStorage.getItem('userToken'))
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)
  const [user, setUser] = React.useState<Usuario | null>(null)
  
  React.useEffect(()=>{
    authVerify()
      .then(auth => {
        setIsAuthenticated(auth)
      })
      .catch(auth=>{
        setIsAuthenticated(auth)
      })
    const token = localStorage.getItem('userToken')

    if(token){
      try{
        const decodedToken: any = jwtDecode(token)
        setUser(decodedToken?.user)
      }catch(err){
        console.log(err)
      }
    }
  }, [])
  return (
    <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          {isAuthenticated && user && <Header isAuthenticated={isAuthenticated} user={user}/>}
          <Routes>
            <Route path='/'
              element={
                <ProtectRoutes isAuthenticated={isAuthenticated} >
                  <Home />
                </ProtectRoutes>
              }
            />
            <Route path='/certificados'
              element={
                <ProtectRoutes isAuthenticated={isAuthenticated} >
                  <Certificates />
                </ProtectRoutes>
              }
            />
            <Route path='/emails' element={
              <ProtectRoutes isAuthenticated={isAuthenticated} >
                <Emails />
              </ProtectRoutes>
            } />
            <Route path='/adicionarCertificado' element={
              <ProtectRoutes isAuthenticated={isAuthenticated} >
                <AddCertificates />
              </ProtectRoutes>
            } />
            <Route path='/atividades' element={
              <ProtectRoutes isAuthenticated={isAuthenticated} >
                <Activities />
              </ProtectRoutes>
            } />
            <Route 
              path='/login' 
              element={
                <Login 
                  userToken={userToken} 
                  setUserToken={setUserToken}
                />
              } 
              />
          </Routes>
          {isAuthenticated && user && <Footer />}
        </div>
    </BrowserRouter>
  );
}

export default App;
