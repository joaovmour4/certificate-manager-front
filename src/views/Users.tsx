import React from 'react'
import SearchBar from '../components/searchBar/SearchBar'
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable'
import api from '../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import UsersTable from '../components/UsersTable/UsersTable'
import AddUserModal from '../modals/AddUserModal'
import { useAuth } from '../contexts/auth'
import { Navigate } from 'react-router-dom'

const Users = () => {
    const Auth = useAuth()
    const [users, setUsers] = React.useState<Array<Usuario>>()
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    const options = [
        {value:'all', name:'Todos'},
        {value:'1', name:'Fiscal'}, 
        {value:'2', name:'Contábil'}, 
        {value:'3', name:'Recursos Humanos'},
        {value:'4', name:'Financeiro'}
    ]

    React.useEffect(()=>{
        api
            .get('/user')
            .then((response: AxiosResponse) =>{
                console.log(response)
                setUsers(response.data)
                setLoading(false)
            })
            .catch((error: AxiosError)=>{
                console.log(error.message)
            })
    }, [])

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
            {users && <UsersTable usuarios={users} loading={loading}/>}
            {showAddModal && <AddUserModal setShowModal={setShowAddModal}/>}
        </div>
    )
}

export default Users