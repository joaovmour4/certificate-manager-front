import React from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'
import loadingImg from '../../img/loading.png'
import UsersTableLine from '../UsersTableLine/UsersTableLine'
interface props{
    usuarios: Array<Usuario>
    loading: boolean
}

const UsersTable = (props: props) => {
    if(props.loading)
        return (
            <img src={loadingImg} className='animate-spin' alt="" />
        )
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