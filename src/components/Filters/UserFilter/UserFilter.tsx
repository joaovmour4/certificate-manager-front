import React from 'react'
import { Usuario } from '../../ActivitiesTable/ActivitiesTable'
import { useSession } from '../../../contexts/sessionContext'

const UserFilter = () => {
    const [usuariosFiltrados, setUsuariosFiltrados] = React.useState<Array<Usuario>>([])
    const { filterParams, setFilterParams, usuarios } = useSession()

    function verifyUserInArray (array: Array<Usuario>, user: Usuario){
        return array.some(item => item.username === user.username)
    }
        
    React.useMemo(()=>{
        setUsuariosFiltrados(filterParams.usersFilter)
    }, [filterParams.usersFilter])

    React.useEffect(()=> {
        const func = () => {
            setFilterParams({
                usersFilter: usuariosFiltrados
            })
        }
        const delayDebounceFn = setTimeout(func, 1000)
        return () => {
            clearTimeout(delayDebounceFn)
        }
    }, [usuariosFiltrados, setFilterParams])

    return (
        <div className='overflow-y-auto scrollbar scrollbar-thin py-1'>
            Responsavel
            {    
                usuarios.map(usuario => {
                    return (
                        <div className='flex gap-x-1 pr-3 py-0.5 font-thin'>
                            <input 
                                onChange={()=>{
                                    verifyUserInArray(usuariosFiltrados, usuario) ?
                                    setUsuariosFiltrados(usuariosFiltrados.filter(prevArray => prevArray.username !== usuario.username))
                                    :
                                    setUsuariosFiltrados(prevState => [...prevState, usuario])
                                }} 
                                type="checkbox" 
                                name={usuario.username} 
                                id={usuario.username}
                                checked={verifyUserInArray(usuariosFiltrados, usuario)}
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