import React from 'react'
import ActivitiesTable from '../components/ActivitiesTable/ActivitiesTable'
import SearchBar from '../components/searchBar/SearchBar'



const Activities = () => {

    function getCompetencias(qtdMeses: number){
        const datas: Array<Date> = []
        const data = new Date()
        datas.push(data)
        for(let i=0; i<qtdMeses; i++){
            data.setMonth(data.getMonth()-1)
            datas.push(data)
        }
    
        return datas
    }

    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')
    const competencias = getCompetencias(12)

    return (
        <div className='flex-1 flex flex-col px-20 py-10'>
            <h1 className='text-3xl font-thin'>Minhas Atividades</h1>
            <div className='py-10 flex justify-between'>
                <SearchBar setSearch={setSearch} setFilter={setFilter} options={[
                    {value:'all', name:'Todos'},
                    {value:'simples', name:'Simples'}, 
                    {value:'presumido', name:'Presumido'}, 
                    {value:'real', name:'Real'}
                ]}/>
                <select className="flex-none bg-transparent focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 p-2.5 focus:outline-none">
                    {competencias.map((competencia) => {
                        return (
                            <option value={competencia.getMonth()}>{competencia.getMonth()+1}/{competencia.getFullYear()}</option>
                        )
                    })}
                </select>  
            </div>
            <ActivitiesTable />
        </div>
    )
}

export default Activities