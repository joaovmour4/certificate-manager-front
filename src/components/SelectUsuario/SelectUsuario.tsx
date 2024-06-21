import React from 'react'
import { Empresa, Usuario } from '../ActivitiesTable/ActivitiesTable'
import api from '../../services/api'

interface props{
  empresa: Empresa
  Usuarios: Array<Usuario>
  responsavel: string
}

const SelectUsuario = (props: props) => {

  const [user, setUser] = React.useState<string>(props.responsavel)

  const handleUsuario = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const user = props.Usuarios.find(usuario => usuario.login === event.target.value)

    const data = {
      idEmpresa: props.empresa.idEmpresa,
      idUsuario: user?.idUsuario
    }
    api
      .patch(`/empresa/usuario`, data)
        .then(() => {
          user && setUser(user.login)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <>
      <select onChange={handleUsuario} value={user} disabled={!props.empresa.situacaoFinanceiro.active} className='max-w-[90px] bg-transparent text-sm focus:outline-none'>
        <option value="default" disabled></option>
        {props.Usuarios.map((usuario) => {
          return(
            <option value={usuario.login}>
              {usuario.username}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default SelectUsuario