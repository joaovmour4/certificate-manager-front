import React from 'react'
import logoImg from '../img/MG logo x7 - svg - ORIGINAL.svg'
import Input from '../components/Input/Input'
import api from '../services/api'
import ResponseModalComponent from '../modals/ResponseModalComponent'
import { Navigate } from 'react-router-dom'
interface props{
  userToken: string | null
  setUserToken: Function
}

const Login = (props: props) => {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [mostrarSenha, setMostrarSenha] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [response, setResponse] = React.useState({})

  const handleSenha = () =>{
    setMostrarSenha(mostrarSenha => !mostrarSenha)
  }

  const handleEntrar = () =>{
    const data = {
      login: user,
      password: password
    }
    api
      .post('/login', data)
      .then(response => {
        if(response.status === 200){
          window.localStorage.setItem('userToken', response.data.authentication.token)
          window.location.reload()
        }
      })
      .catch(err => {
        setResponse(err.response)
        setShowModal(true)
      })
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      {props.userToken && <Navigate to='/' replace={true} />}
      <img className='h-56 w-auto sm:flex-none' src={logoImg} alt="Logo MG" />
      <Input 
        type='text'
        placeHolder='Usuário ou Email'
        setInput={setUser}
      />
      <Input 
        type='password'
        placeHolder='Senha'
        setInput={setPassword}
      />
      <button onClick={handleEntrar} className='mt-5 py-1 px-5 rounded shadow bg-blue hover:bg-blue-active'>
        Entrar
      </button>
      {showModal && 
        <ResponseModalComponent 
          setShowModal={setShowModal}
          response={response}
          setShowAddModal={null}
        />}
    </div>
  )
}

export default Login