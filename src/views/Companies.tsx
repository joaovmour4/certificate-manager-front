import React from 'react'
import SearchBar from '../components/searchBar/SearchBar'
import { Empresa } from '../components/ActivitiesTable/ActivitiesTable'
import api from '../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import CompaniesTable from '../components/CompaniesTable/CompaniesTable'
import AddCompanyModal from '../modals/AddCompanyModal'

const Companies = () => {
    const [empresas, setEmpresas] = React.useState<Array<Empresa>>()
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    const options = [
        {value:'all', name:'Todos'},
        {value:'1', name:'Simples'}, 
        {value:'2', name:'Presumido'}, 
        {value:'3', name:'Real'}
    ]

    React.useEffect(()=>{
        api
            .get('/empresa')
            .then((response: AxiosResponse) =>{
                setEmpresas(response.data)
                setLoading(false)
            })
            .catch((error: AxiosError)=>{
                console.log(error.message)
            })
    }, [])

    return (
        <div className='flex flex-1 flex-col justify-start px-20 py-10 font-thin'>
            <h1 className="text-3xl font-thin">Empresas</h1>
            <div className="flex flex-row justify-between flex-wrap py-10">
                <SearchBar
                    setSearch={setSearch}
                    setFilter={setFilter}
                    options={options}
                />
                <button onClick={()=>setShowAddModal(true)} className="text-white rounded bg-green-600 px-5 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                    Adicionar Empresa
                </button>
            </div>
            {empresas && <CompaniesTable empresas={empresas} loading={loading}/>}
            {showAddModal && <AddCompanyModal setShowModal={setShowAddModal}/>}
        </div>
    )
}

export default Companies