import React from 'react'
import SearchBar from '../components/searchBar/SearchBar'
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable'
import api from '../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import UsersTable from '../components/UsersTable/UsersTable'
import AddUserModal from '../modals/AddUserModal'
import { useAuth } from '../contexts/auth'
import { Navigate } from 'react-router-dom'
import loadingImg from '../img/loading.png'
interface option{
    value: string
    name: string
}

const Users = () => {
    const Auth = useAuth()
    const [users, setUsers] = React.useState<Array<Usuario>>()
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('all')
    const [loading, setLoading] = React.useState(true)

    const [options, setOptions] = React.useState<Array<option>>([])

    React.useEffect(()=>{
        api
            .get('/setor')
            .then(response=>{
                setOptions([{value:'all', name:'Todos'}])
                for(const setor of response.data){
                    setOptions(prevState=> [...prevState, {value: String(setor.idSetor), name: setor.setorName}])
                }
            })
            .catch(err=>{
                console.log(err.response.message)
            })
    }, [])

    React.useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            api
                .get(`/user?setor=${filter}&search=${search}`)
                .then((response: AxiosResponse) =>{
                    setUsers(response.data)
                    setLoading(false)
                })
                .catch((error: AxiosError)=>{
                    console.log(error.message)
                })
        }, 300)

        return () => clearTimeout(delayDebounceFn)
        
    }, [search, filter])

    return (
        <div className='flex flex-1 flex-col justify-start px-20 py-10 font-thin'>
            {(Auth.user?.cargo !== 'admin' && Auth.user?.cargo !== 'supervisor') &&
                <Navigate to='/' replace={true} />
            }
            <h1 className="text-3xl font-thin">Usuários</h1>
            <div className="flex flex-row justify-between flex-wrap py-10">
                <SearchBar
                    setSearch={setSearch}
                    setFilter={setFilter}
                    options={options}
                />
                <button onClick={()=>setShowAddModal(true)} className="text-white rounded bg-green-600 px-5 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                    Adicionar Usuario
                </button>
            </div>
            {loading && 
                <div className='flex justify-center'>
                    <img src={loadingImg} className='animate-spin h-28 w-28' alt="" />
                </div>
            }
            {users && !loading && <UsersTable usuarios={users} />}
            {showAddModal && <AddUserModal setShowModal={setShowAddModal}/>}
        </div>
    )
}

export default Users