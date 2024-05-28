import React from 'react'
import logoImg from '../img/MG logo x7 - svg - ORIGINAL.svg'

const Login = () => {
  const [mostrarSenha, setMostrarSenha] = React.useState(false)

  const handleSenha = () =>{
    setMostrarSenha(mostrarSenha => !mostrarSenha)
  }

  return (
    <div className="flex-1">
      <label htmlFor="">Usuário</label>
      <input type="email" name="" id="email" />
      <label htmlFor="">Senha</label>
      <input type={mostrarSenha?'text':'password'}/>
      <button onClick={handleSenha}>Mostrar Senha</button>
    </div>
  )
}

export default Login