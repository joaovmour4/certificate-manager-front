import React from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'
import UsersTableLine from '../UsersTableLine/UsersTableLine'
interface props{
    usuarios: Array<Usuario>
}

const UsersTable = (props: props) => {
    return (
        <table className='divide-y table-fixed'>
            <thead>
            <tr>
                <th className='pl-5 text-left'>Nome</th>
                <th>Setor</th>
                <th className='w-24'>Ações</th>
            </tr>
            </thead>
            <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
                {props.usuarios && props.usuarios.map((usuario)=>{
                    return(
                        <UsersTableLine
                            usuario={usuario}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default UsersTable