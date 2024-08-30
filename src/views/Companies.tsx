import React from 'react'
import SearchBar from '../components/searchBar/SearchBar'
import { Empresa } from '../components/ActivitiesTable/ActivitiesTable'
import api from '../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import CompaniesTable from '../components/CompaniesTable/CompaniesTable'
import AddCompanyModal from '../modals/AddCompanyModal'
import loadingImg from '../img/loading.png'
import addCompanyImg from '../img/adicionar-empresa.png'
interface option{
    value: string
    name: string
}

const Companies = () => {
    const [empresas, setEmpresas] = React.useState<Array<Empresa>>()
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('all')
    const [loading, setLoading] = React.useState(true)
    const [order, setOrder] = React.useState({
        field: 'nameEmpresa',
        ascending: true
      })
    const [options, setOptions] = React.useState<Array<option>>([])

    React.useEffect(()=>{
        api
        .get('/regime')
        .then(response=>{
            setOptions([{value:'all', name:'Todos'}])
            for(const regime of response.data){
                setOptions(prevState=> [...prevState, {value: String(regime.idRegime), name: regime.regimeName}])
            }
        })
        .catch(err=>{
            console.log(err.response.message)
        })
    }, [])

    React.useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            api
            .get(`/empresa?filter=${filter}&search=${search}&of=${order.field}&o=${order.ascending}`)
            .then((response: AxiosResponse) =>{
                setEmpresas(response.data)
                setLoading(false)
            })
            .catch((error: AxiosError)=>{
                console.log(error.message)
            })
        }, 300)

        return ()=> clearTimeout(delayDebounceFn)

    }, [search, filter, order])

    return (
        <div className='flex flex-1 flex-col justify-start px-20 py-10 font-thin'>
            <h1 className="text-3xl font-thin">Empresas</h1>
            <div className="flex flex-row justify-between flex-wrap pt-10 pb-5">
                <SearchBar
                    setSearch={setSearch}
                    setFilter={setFilter}
                    options={options}
                />
                <button onClick={()=>setShowAddModal(true)} className="flex flex-row items-center gap-x-2 text-sm font-normal text-white rounded bg-green-600 px-5 py-1 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                    <img className='h-7' src={addCompanyImg} alt="" />
                    ADICIONAR EMPRESA
                </button>
            </div>
            {loading && 
                <div className='flex justify-center'>
                    <img src={loadingImg} className='animate-spin h-28 w-28' alt="" />
                </div>
            }
            {empresas && !loading && 
                <>
                    <p className='text-xs text-gray-500 italic pb-1'>{empresas.length} Registros</p>
                    <CompaniesTable 
                        empresas={empresas} 
                        loading={loading} 
                        order={order}
                        setOrder={setOrder} 
                    />
                </>
            }
            {showAddModal && <AddCompanyModal setShowModal={setShowAddModal}/>}
        </div>
    )
}

export default Companies