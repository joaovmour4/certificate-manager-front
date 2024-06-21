import React from 'react'
import logoImg from '../img/MG logo x7 - svg - ORIGINAL.svg'
import Input from '../components/Input/Input'
import ResponseModalComponent from '../modals/ResponseModalComponent'
import { Navigate } from 'react-router-dom'
import PasswordInput from '../components/Input/PasswordInput'
import { AxiosResponseModal } from '../modals/ConfirmModal'
import AuthContext from '../contexts/auth'

const Login = () => {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [response, setResponse] = React.useState<AxiosResponseModal>()
  const Auth = React.useContext(AuthContext)

  const handleEntrar = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const data = {
      login: user,
      password: password
    }
    Auth.Login(data)
      .catch(err=>{
        setResponse(err.response)
        setShowModal(true)
      })
  }

  return (
    <form onSubmit={handleEntrar} className="flex-1 flex flex-col justify-center items-center">
      {Auth.signed && <Navigate to='/' replace={true} />}
      <img className='h-56 w-auto sm:flex-none' src={logoImg} alt="Logo MG" />
      <Input 
        type='text'
        placeHolder='Usuário ou Email'
        setInput={setUser}
      />
      <PasswordInput 
        placeHolder='Senha'
        setInput={setPassword}
      />
      <button className='mt-5 py-1 px-5 rounded shadow bg-blue hover:bg-blue-active'>
        Entrar
      </button>
      {showModal && response && 
        <ResponseModalComponent 
          setShowModal={setShowModal}
          response={response}
          setShowAddModal={null}
        />}
    </form>
  )
}

export default Login