import React from 'react'
import { Empresa, Usuario } from '../ActivitiesTable/ActivitiesTable'
import SelectUsuario from '../SelectUsuario/SelectUsuario'
interface props{
    Empresas: Array<Empresa>
    Usuarios: Array<Usuario>
}

const SelectUserTable = (props: props) => {
  return (
    <table className='divide-y mb-3'>
        <thead>
            <tr>
                <th className='text-center whitespace-nowrap'>Usuário</th>
            </tr>
        </thead>
        <tbody className='[&>*:nth-child(odd)]:bg-blue-table divide-y'>
            {props.Empresas && props.Empresas.map((empresa)=>{
                return(
                    <tr>
                        <td>
                            <SelectUsuario 
                                empresa={empresa}
                                Usuarios={props.Usuarios}
                            />
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default SelectUserTable