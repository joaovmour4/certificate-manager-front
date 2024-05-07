import React from 'react'
import ActivitiesTable from '../components/ActivitiesTable/ActivitiesTable'
import SearchBar from '../components/searchBar/SearchBar'

const Activities = () => {
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')

    return (
        <div className='flex-1 flex flex-col px-20 py-10'>
            <h1 className='text-3xl font-thin'>Minhas Atividades</h1>
            <div className='py-10'>
                <SearchBar setSearch={setSearch} setFilter={setFilter} options={[
                    {value:'all', name:'Todos'},
                    {value:'simples', name:'Simples'}, 
                    {value:'presumido', name:'Presumido'}, 
                    {value:'real', name:'Real'}
                ]}/>
            </div>
            <ActivitiesTable />
        </div>
    )
}

export default Activities