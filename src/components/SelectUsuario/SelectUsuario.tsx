import React, { useEffect } from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'

interface props{
  Usuarios: Array<Usuario>
}

const SelectUsuario = (props: props) => {
  return (
    <>
      <select className='max-w-[90px] bg-transparent text-sm focus:outline-none'>
        {props.Usuarios.map((usuario) => {
          return(
            <option value={usuario.idUsuario}>{usuario.username}</option>
          )
        })}
      </select>
    </>
  )
}

export default SelectUsuario