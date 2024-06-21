import React from 'react'
import ActivitiesTable from '../components/ActivitiesTable/ActivitiesTable'
import SearchBar from '../components/searchBar/SearchBar'
import api from '../services/api'
import { AxiosResponse } from 'axios'
import SelectCompetencia from '../components/SelectCompetencia/SelectCompetencia'
interface Competencia{
    idCompetencia: number
    mes: string
    ano: string
}


const Activities = () => {

    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('all')
    const [competencias, setCompetencias] = React.useState<Array<Competencia>>([])
    const [competencia, setCompetencia] = React.useState<Competencia>()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(()=>{
        api
            .get('/competencia')
            .then((response: AxiosResponse)=>{
                const actualDate = new Date()
                setCompetencias(response.data)
                setCompetencia(response.data.find((arrayElement: Competencia) => 
                    Number(arrayElement.mes) === actualDate.getMonth()+1 && 
                    Number(arrayElement.ano) === actualDate.getFullYear()
                ))
            })
            .catch(err =>{
                console.log(err.message)
            })
    }, [])

    return (
        <div className='flex-1 flex flex-col px-20 py-10 pb-32'>
            <h1 className='text-3xl font-thin'>Minhas Atividades</h1>
            <div className='py-10 flex justify-between'>
                <SearchBar setSearch={setSearch} setFilter={setFilter} options={[
                    {value:'all', name:'Todos'},
                    {value:'1', name:'Simples'}, 
                    {value:'2', name:'Presumido'}, 
                    {value:'3', name:'Real'}
                ]}/>
                <SelectCompetencia 
                    competencias={competencias}
                    competencia={competencia!}
                    setCompetencia={setCompetencia}
                    setLoading={setLoading}
                /> 
            </div>
            <ActivitiesTable 
                filter={filter}
                search={search}
                competencia={competencia!}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    )
}

export type { Competencia }
export default Activities