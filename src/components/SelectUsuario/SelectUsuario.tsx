import React from 'react'
import { Empresa, Usuario } from '../ActivitiesTable/ActivitiesTable'
import api from '../../services/api'

interface props{
  empresa: Empresa
  Usuarios: Array<Usuario>
}

const SelectUsuario = (props: props) => {

  const [user, setUser] = React.useState<Usuario | null>(props.empresa.responsavel)

  const handleUsuario = (event: any) => {

    const user = props.Usuarios.find(usuario => usuario.login === event.target.value)

    const data = {
      idEmpresa: props.empresa.idEmpresa,
      idUsuario: user?.idUsuario
    }
    api
      .patch(`/empresa/usuario`, data)
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <>
      <select onChange={handleUsuario} defaultValue={'default'} className='max-w-[90px] bg-transparent text-sm focus:outline-none'>
        <option value="default" disabled></option>
        {props.Usuarios.map((usuario) => {
          return(
            <option selected={user && user.idUsuario === usuario.idUsuario ? true:false} value={usuario.login}>
              {usuario.username}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default SelectUsuario