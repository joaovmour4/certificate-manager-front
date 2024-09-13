import React from 'react'
import ActivitiesTable from '../components/ActivitiesTable/ActivitiesTable'
import SearchBar from '../components/searchBar/SearchBar'
import api from '../services/api'
import { AxiosResponse } from 'axios'
import SelectCompetencia from '../components/SelectCompetencia/SelectCompetencia'
import { useAuth } from '../contexts/auth'
import { Setor } from '../App'
import AddActivityModal from '../modals/AddActivityModal'
import addActivityImg from '../img/adicionar-lista.png'
import { SessionContextData, useSession } from '../contexts/sessionContext'
interface Competencia{
    idCompetencia: number
    mes: string
    ano: string
}


const MyActivities = () => {
    const Auth = useAuth()
    const {searchParams, setSearchParams} = useSession()
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('all')
    const [competencias, setCompetencias] = React.useState<Array<Competencia>>([])
    const [competencia, setCompetencia] = React.useState<Competencia | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [setor, setSetor] = React.useState<string>(Auth.user?.Setor ? String(Auth.user.idSetor):String(searchParams.setor))
    const [setores, setSetores] = React.useState<Array<Setor>>([])
    const [showAddActivityModal, setShowAddActivityModal] = React.useState(false)

    const handleSetor = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setLoading(true)
        setSetor(event.target.value)
        setSearchParams((prevState: SessionContextData) => {
            return {...prevState, 
                setor: event.target.value
            }
        })
    }
    const handleAddActivityModal = () => {
        setShowAddActivityModal(true)
    }

    React.useEffect(()=>{
        api
            .get('/competencia')
            .then((response: AxiosResponse)=>{
                const actualDate = new Date()
                setCompetencias(response.data)
                if(searchParams.competencia)
                    setCompetencia(searchParams.competencia)
                else
                    setCompetencia(response.data.find((arrayElement: Competencia) => 
                        Number(arrayElement.mes) === actualDate.getMonth() && 
                        Number(arrayElement.ano) === actualDate.getFullYear()
                    ))
            })
            .catch(err =>{
                console.log(err.message)
            })
        api
            .get('/setor')
            .then(response=>{
                setSetores(response.data.filter((element: Setor) => element.idSetor !== 4))
                // Retirando o Setor Financeiro com id 4 da lista
            })
            .catch(err=>{
                console.log(err.response.message)
            })
    }, [searchParams.competencia])

    return (
        <div className='flex-1 flex flex-col px-20 py-10 pb-32'>
            <h1 className='text-3xl font-thin'>Minhas Atividades</h1>
            <div className='pt-10 pb-5 flex justify-between'>
                <div className='flex gap-x-5'>
                    <SearchBar setSearch={setSearch} setFilter={setFilter} options={[
                        {value:'all', name:'Todos'},
                        {value:'1', name:'Simples'},
                        {value:'2', name:'Presumido'},
                        {value:'3', name:'Real'}
                    ]}/>
                    {(Auth.user?.cargo === 'admin' || Auth.user?.Setor?.idSetor === 4) &&
                        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:shadow-md p-2.5 focus:outline-none divide-x divide-slate-300">
                            <select value={setor} className="flex-none bg-transparent font-thin focus:outline-none select-none" onChange={handleSetor}>
                                {setores.map((option) => {
                                    return (
                                        <option value={option.idSetor}>{option.setorName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                </div>
                <div className='flex flex-row gap-5'>
                    <button onClick={handleAddActivityModal} 
                        className='flex flex-row gap-x-3 items-center font-normal text-sm rounded px-3 bg-green-600 hover:bg-green-500 text-white'
                    >
                        <img className='h-5' src={addActivityImg} alt="" />
                        CADASTRAR ATIVIDADE
                    </button>
                    {competencia &&
                    <SelectCompetencia 
                        competencias={competencias}
                        competencia={competencia}
                        setCompetencia={setCompetencia}
                        setLoading={setLoading}
                    />} 
                </div>
            </div>
            {competencia &&
            <ActivitiesTable
                filter={filter}
                search={search}
                competencia={competencia}
                setor={setor}
                loading={loading}
                setLoading={setLoading}
            />
            }
            {showAddActivityModal &&
                <AddActivityModal 
                    setor={setor}
                    setShowModal={setShowAddActivityModal}
                />
            }
        </div>
    )
}

export type { Competencia }
export default MyActivities