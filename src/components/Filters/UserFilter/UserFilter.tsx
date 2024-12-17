import React from 'react'
import { Usuario } from '../../ActivitiesTable/ActivitiesTable'
import { useSession } from '../../../contexts/sessionContext'

const UserFilter = () => {
    // const [usuariosFiltrados, setUsuariosFiltrados] = React.useState<Array<Usuario>>([])
    const { usuarios, filterParams, filteredUsers, setFilteredUsers } = useSession()

    function verifyUserInArray (array: Array<Usuario>, user: Usuario){
        return array.some(item => item.username === user.username)
    }
        
    React.useEffect(()=>{
        setFilteredUsers(filterParams.usersFilter)
    }, [filterParams.usersFilter, setFilteredUsers])

    const userHandler = (usuario: Usuario) => {
        if(verifyUserInArray(filteredUsers, usuario)){
            setFilteredUsers(filteredUsers.filter(prevArray => prevArray.username !== usuario.username))
        }else{
            setFilteredUsers((prevState: Array<Usuario>) => [...prevState, usuario])
        }
    }

    return (
        <div className='overflow-y-auto scrollbar scrollbar-thin py-1'>
            Responsavel
            {    
                usuarios.map(usuario => {
                    return (
                        <div className='flex gap-x-1 pr-3 py-0.5 font-thin'>
                            <input 
                                onChange={()=>{
                                    userHandler(usuario)
                                }} 
                                type="checkbox" 
                                name={usuario.username} 
                                id={usuario.username}
                                checked={
                                    verifyUserInArray(filteredUsers, usuario)
                                }
                            />
                            <label htmlFor={usuario.username}>
                                {usuario.username}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserFilter